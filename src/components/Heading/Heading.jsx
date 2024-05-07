import React from 'react';
import PropTypes from 'prop-types';
import './Heading.css';

const Heading = ({ text, size, color }) => {
  return (
    <div className={`title ${size}`} style={{ color }}>
      {text}
    </div>
  );
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
};

Heading.defaultProps = {
  size: 'medium',
  color: '#000', // Default color black
};

export default Heading;
