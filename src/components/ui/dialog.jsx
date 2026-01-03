import React from 'react';
import { Button } from './button';

export const Dialog = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex justify-end space-x-2">
          {children}
        </div>
      </div>
    </div>
  );
};
