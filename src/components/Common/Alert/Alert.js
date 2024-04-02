import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, visible, onClose,alertClass }) => {
    
  // useEffect(() => {
  //   let timer;
  //   if (visible) {
  //     timer = setTimeout(() => {
  //       onClose();
  //     }, 3000); // Alert will disappear after 3000 milliseconds (3 seconds)
  //   }
  //   return () => clearTimeout(timer);
  // }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${alertClass}`}>
      {message}
    </div>
  );
};

export default Alert;
