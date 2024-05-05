import React from 'react';
import './ErrorBanner.css';

const ErrorBanner = ({ message }) => {
  return (
    <div className="error-banner">
      <p>{message}</p>
    </div>
  );
};

export default ErrorBanner;
