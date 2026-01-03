import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { audit as api, authMe } from '../../../lib/api.js';

const AuditContext = createContext(null);

const initialState = {
  audits: [],
  findings: [],
};

const ACTIONS = {
  SET_AUDITS: 'SET_AUDITS',
  SET_FINDINGS: 'SET_FINDINGS',
  UPSERT_AUDIT: 'UPSERT_AUDIT',
  UPSERT_FINDING: 'UPSERT_FINDING',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_AUDITS:
      return { ...state, audits: action.payload };
    case ACTIONS.SET_FINDINGS:
      return { ...state, findings: action.payload };
    case ACTIONS.UPSERT_AUDIT: {
      const audit = action.payload;
      const exists = state.audits.some(({ id }) => id === audit.id);
      return {
        ...state,
        audits: exists ? state.audits.map((i) => (i.id === audit.id ? audit : i)) : [...state.audits, audit],
      };
    }
    case ACTIONS.UPSERT_FINDING: {
      const finding = action.payload;
      const exists = state.findings.some(({ id }) => id === finding.id);
      return {
        ...state,
        findings: exists ? state.findings.map((i) => (i.id === finding.id ? finding : i)) : [...state.findings, finding],
      };
    }
    default:
      return state;
  }
}

export const AuditProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const me = await authMe();
        if (!me || me.role !== 'STARTUP_ADMIN') {
          setError('Unauthorized');
          setLoading(false);
          return;
        }
        const [audits, findings] = await Promise.all([api.audits.list(), api.findings.list()]);
        dispatch({ type: ACTIONS.SET_AUDITS, payload: audits });
        dispatch({ type: ACTIONS.SET_FINDINGS, payload: findings });
        setLoading(false);
      } catch (e) {
        setError('Failed to load audits');
        setLoading(false);
      }
    };
    load();
  }, []);

  const value = useMemo(() => {
    const createAudit = async (data) => {
      const created = await api.audits.create(data);
      dispatch({ type: ACTIONS.UPSERT_AUDIT, payload: created });
      return created.id;
    };

    const updateAudit = async (id, updates) => {
      const updated = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/audit/audits/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      }).then((r) => r.json());
      dispatch({ type: ACTIONS.UPSERT_AUDIT, payload: updated });
    };

    const createFinding = async (data) => {
      const created = await api.findings.create(data);
      dispatch({ type: ACTIONS.UPSERT_FINDING, payload: created });
      return created.id;
    };

    const updateFinding = async (id, updates) => {
      const updated = await api.findings.update(id, updates);
      dispatch({ type: ACTIONS.UPSERT_FINDING, payload: updated });
    };

    const deleteFinding = async (id) => {
      await api.findings.remove(id);
      const next = state.findings.filter((f) => String(f.id) !== String(id));
      dispatch({ type: ACTIONS.SET_FINDINGS, payload: next });
    };

    const deleteAudit = async (id) => {
      await api.audits.remove(id);
      const nextAudits = state.audits.filter((a) => String(a.id) !== String(id));
      const nextFindings = state.findings.filter((f) => String(f.auditId) !== String(id));
      dispatch({ type: ACTIONS.SET_AUDITS, payload: nextAudits });
      dispatch({ type: ACTIONS.SET_FINDINGS, payload: nextFindings });
    };

    return {
      audits: state.audits,
      findings: state.findings,
      loading,
      error,
      createAudit,
      updateAudit,
      deleteAudit,
      createFinding,
      updateFinding,
      deleteFinding,
    };
  }, [state, loading, error]);

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
};

export const useAuditData = () => {
  const ctx = useContext(AuditContext);
  if (!ctx) {
    throw new Error('useAuditData must be used within an AuditProvider');
  }
  return ctx;
};

