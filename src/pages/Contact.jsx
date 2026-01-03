import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import '../styles/pages/Contact.css';

export default function Contact() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Ready to transform your business? Let's discuss your IT needs</p>
        </div>
      </section>

      <section className="contact-page">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Let's Build Something Amazing Together</h2>
              <p>Ready to transform your business with innovative IT solutions? Get in touch with our experts today.</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon email"><Mail color='white' /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p>info@develup.com</p>
                    <p>support@develup.com</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon phone"><Phone color='white' /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 8015011837</p>
                    <p>+91 6379809109</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon location"><MapPin color='white' /></div>
                  <div>
                    <h4>Visit Us</h4>
                    <p>123 Tech Street, Digital City</p>
                    <p>Suite 456, Innovation Hub</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h4>Business Hours</h4>
                <div className="hours-grid">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>Send us a Message</h3>
              <form>
                <div className="form-row">
                  <div className="forms">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="forms">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="forms">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="forms">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                </div>
                <div className="forms">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" />
                </div>
                <div className="forms">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" name="service" required style={{ borderColor: 'var(--neutral-200)' }}>
                    <option value="">Select a service</option>
                    <option value="cloud">Cloud Solutions</option>
                    <option value="security">Cybersecurity</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Solutions</option>
                    <option value="consulting">IT Consulting</option>
                  </select>
                </div>
                <div className="forms">
                  <label htmlFor="budget">Project Budget</label>
                  <select id="budget" name="budget" style={{ borderColor: 'var(--neutral-200)' }}>
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                <div className="forms">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell us about your project requirements..." required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="contact-icon location"><MapPin color='white' /></div>
              <h3>Our Location</h3>
              <p>123 Tech Street, Digital City<br/>Suite 456, Innovation Hub</p>
              <button className="map-button">View on Google Maps</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}