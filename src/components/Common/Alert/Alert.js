import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, visible, onClose }) => {
    
  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 3000); // Alert will disappear after 3000 milliseconds (3 seconds)
    }
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, backgroundColor: 'lightblue', padding: 10, borderRadius: 5 }}>
      {message}
    </div>
  );
};

export default Alert;
