import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({ children, type = "single", collapsible = false, className = "", ...props }) => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (value) => {
    if (type === "single" && collapsible && openItem === value) {
      setOpenItem(null);
    } else {
      setOpenItem(value);
    }
  };

  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen: openItem === child.props.value,
            onToggle: handleToggle,
          });
        }
        return child;
      })}
    </div>
  );
};

const AccordionItem = ({ children, value, isOpen, onToggle, className = "", ...props }) => {
  return (
    <div className={`border-b ${className}`} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AccordionTrigger) {
          return React.cloneElement(child, { isOpen, onToggle, value });
        }
        if (React.isValidElement(child) && child.type === AccordionContent) {
          return React.cloneElement(child, { isOpen });
        }
        return child;
      })}
    </div>
  );
};

const AccordionTrigger = ({ children, isOpen, onToggle, value, className = "", suffix, ...props }) => {
  return (
    <button
      type="button"
      className={`flex w-full items-center py-4 font-medium transition-all ${className}`}
      onClick={() => onToggle(value)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {suffix && (
        <div className="ml-auto">
          {suffix}
        </div>
      )}
    </button>
  );
};

const AccordionContent = ({ children, isOpen, className = "", ...props }) => {
  return (
    <div
      className={`overflow-hidden text-sm transition-all duration-200 ${isOpen ? 'h-auto py-4' : 'h-0'}`}
      {...props}
    >
      <div className={className}>{children}</div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
