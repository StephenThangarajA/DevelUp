import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAgent.css';

const CreateAgent = ({ onCreateAgent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'Support Agent',
    status: 'online',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newAgent = onCreateAgent ? onCreateAgent(formData) : null;
      navigate('/helpdesksystem/agents');
    } catch (error) {
      console.error('Error creating agent:', error);
      setErrors({ submit: 'Failed to create agent. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-agent-page">
      <div className="page-container">
        <Link to="/helpdesksystem/agents" className="back-link">← Back to Agents</Link>
        <div className="create-agent-header">
          <h1>Add New Agent</h1>
          <p>Create a new support agent</p>
        </div>

        <div className="create-agent-content">
          <form onSubmit={handleSubmit} className="agent-form">
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-row">
                <div className="forms">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Enter agent's full name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="forms">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="agent@example.com"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="forms">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Optional"
                  />
                </div>
                <div className="forms">
                  <label htmlFor="department">Department *</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`form-control ${errors.department ? 'error' : ''}`}
                    placeholder="e.g., Technical Support"
                  />
                  {errors.department && <span className="form-error">{errors.department}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="forms">
                  <label htmlFor="role">Role *</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`form-control ${errors.role ? 'error' : ''}`}
                  >
                    <option value="Support Agent">Support Agent</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Specialist">Specialist</option>
                  </select>
                  {errors.role && <span className="form-error">{errors.role}</span>}
                </div>
                <div className="forms">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="online">Online</option>
                    <option value="away">Away</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Information</h3>
              <div className="form-row">
                <div className="forms">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Any additional notes about this agent"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="form-error-message">{errors.submit}</div>
            )}

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/helpdesksystem/agents')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;