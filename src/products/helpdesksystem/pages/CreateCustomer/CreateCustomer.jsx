import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreateCustomer.css';

const CreateCustomer = ({ onCreateCustomer }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCustomer = {
        ...formData,
        ticketsCount: 0,
        lastContact: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      // In a real app, you would save this to your backend
      console.log('New customer created:', newCustomer);

      // Add the new customer to the list
      if (onCreateCustomer) {
        onCreateCustomer(newCustomer);
      }

      // Navigate back to customers list
      navigate('/helpdesksystem/customers');
    } catch (error) {
      console.error('Error creating customer:', error);
      setErrors({ submit: 'Failed to create customer. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-customer-page">
      <div className="page-container">
        <Link to="/helpdesksystem/customers" className="back-link">
          ← Back to Customers
        </Link>
        <div className="create-customer-header">
          <h1>Add New Customer</h1>
          <p>Create a new customer account</p>
        </div>

        <div className="create-customer-content">
          <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Enter customer's full name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`form-control ${errors.company ? 'error' : ''}`}
                    placeholder="Enter company name"
                  />
                  {errors.company && <span className="form-error">{errors.company}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="customer@company.com"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter customer's address"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Any additional notes about this customer"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="form-error-message">
                {errors.submit}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/helpdesksystem/customers')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
