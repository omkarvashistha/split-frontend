import React from 'react';

const ErrorComponent = ({ errorMessage, onRetry }) => {
  return (
    <div style={{ color: 'red', margin: '20px' }}>
      <p>Error: {errorMessage}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorComponent;