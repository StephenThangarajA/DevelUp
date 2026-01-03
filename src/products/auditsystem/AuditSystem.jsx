import React, { useEffect, useState } from 'react';
import { authMe } from '../../lib/api.js';
import { Routes, Route } from 'react-router-dom';
import { AuditProvider } from './context/AuditContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Audits from './pages/Audits';
import AuditDetails from './pages/AuditDetails';
import CreateAudit from './pages/CreateAudit';
import EditAudit from './pages/EditAudit';
import Findings from './pages/Findings';
import CreateFinding from './pages/CreateFinding';
import EditFinding from './pages/EditFinding';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './AuditSystem.css';

function AuditSystem() {
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const me = await authMe();
        if (!me || me.role !== 'STARTUP_ADMIN') {
          setAuthorized(false);
          window.location.href = '/login';
        }
      } catch {
        setAuthorized(false);
        window.location.href = '/login';
      }
    })();
  }, []);
  if (!authorized) return null;
  return (
    <AuditProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="audits" element={<Audits />} />
            <Route path="audits/create" element={<CreateAudit />} />
            <Route path="audits/edit/:id" element={<EditAudit />} />
            <Route path="audits/:id" element={<AuditDetails />} />
            <Route path="findings" element={<Findings />} />
            <Route path="findings/create" element={<CreateFinding />} />
            <Route path="findings/edit/:id" element={<EditFinding />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </AuditProvider>
  );
}

export default AuditSystem;
