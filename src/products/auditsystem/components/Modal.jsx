import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="as-modal-overlay" onClick={onClose}>
      <div className="as-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="as-modal-header">
          <h2 className="as-modal-title">{title}</h2>
          <button className="as-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="as-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;