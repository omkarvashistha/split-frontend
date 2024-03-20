import React from 'react';
import './spinner.css'; // Assuming the CSS is saved in Spinner.css

const Spinner = ({ size = 'medium',color='blue' }) => {
  let sizeClass = 'medium';
  let colorClass = color;

  if (['small', 'medium', 'large'].includes(size)) {
    sizeClass = size;
  }

  const className = `spinner ${sizeClass} ${colorClass}`;
  return <div className={className}></div>;
};

export default Spinner;