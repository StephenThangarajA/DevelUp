import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuditData } from '../context/AuditContext.jsx';
import AuditForm from '../components/AuditForm.jsx';
import './CreateAudit.css'; // Using CreateAudit.css for consistent styling

const EditAudit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { audits, updateAudit } = useAuditData();
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auditId = Number(id);
    const foundAudit = audits.find(a => a.id === auditId);
    if (foundAudit) {
      setAudit(foundAudit);
    } else {
      setError('Audit not found');
    }
    setLoading(false);
  }, [id, audits]);

  const handleSave = (updatedAuditData) => {
    try {
      const auditId = Number(id);
      updateAudit(auditId, updatedAuditData);
      navigate('../audits');
    } catch (err) {
      console.error('Error updating audit:', err);
      setError('Failed to update audit. Please try again.');
    }
  };

  if (loading) {
    return <div className="as-create-audit-page"><p>Loading audit...</p></div>;
  }

  if (error) {
    return <div className="as-create-audit-page"><p className="error-message">{error}</p></div>;
  }

  if (!audit) {
    return <div className="as-create-audit-page"><p>Audit data is not available.</p></div>;
  }

  return (
    <div className="as-create-audit-page">
      <div className="as-create-audit-container">
        <div className="as-create-audit-header">
          <Link to="../audits" className="as-back-link">
            ← Back to Audits
          </Link>
          <h1>Edit Audit</h1>
          <p>Modify the details of this audit</p>
        </div>

        <div className="as-create-audit-form-card">
          <AuditForm
            audit={audit}
            onSave={handleSave}
            onCancel={() => navigate('../audits')}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAudit;