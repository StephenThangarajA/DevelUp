import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuditData } from '../context/AuditContext.jsx';
import FindingForm from '../components/FindingForm.jsx';
import './CreateFinding.css'; // Reusing the same styling

const EditFinding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findings, audits, updateFinding } = useAuditData();
  const [finding, setFinding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findingId = Number(id);
    const foundFinding = findings.find(f => f.id === findingId);
    if (foundFinding) {
      setFinding(foundFinding);
    } else {
      setError('Finding not found');
    }
    setLoading(false);
  }, [id, findings]);

  const handleSave = (updatedFindingData) => {
    try {
      const findingId = Number(id);
      updateFinding(findingId, updatedFindingData);
      navigate('../findings');
    } catch (err) {
      console.error('Error updating finding:', err);
      setError('Failed to update finding. Please try again.');
    }
  };

  if (loading) {
    return <div className="as-create-finding-page"><p>Loading finding...</p></div>;
  }

  if (error) {
    return <div className="as-create-finding-page"><p className="as-error-message">{error}</p></div>;
  }

  if (!finding) {
    return <div className="as-create-finding-page"><p>Finding data is not available.</p></div>;
  }

  // Prepare audits for the FindingForm dropdown
  const auditsForForm = audits.map(audit => ({
    id: audit.id,
    title: audit.title
  }));

  return (
    <div className="as-create-finding-page">
    <div className='as-page-container'>
      <div className="as-create-finding-container">
        <div className="as-create-finding-header">
          <Link to="../findings" className="as-back-link">
            ← Back to Findings
          </Link>
          <h1>Edit Finding</h1>
          <p>Modify the details of this audit finding</p>
        </div>

        <div className="as-create-customer-content">
          <FindingForm
            finding={finding}
            audits={auditsForForm}
            onSave={handleSave}
            onCancel={() => navigate('../findings')}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default EditFinding;