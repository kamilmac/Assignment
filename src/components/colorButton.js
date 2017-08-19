import React from 'react';
import PropTypes from 'prop-types';


const ColorButton = ({ active, color }) => {
  const size = active ? 18 : 15;
  return <div
    style={{
      background: `rgb(${color.toString()})`,
      width: size,
      height: size,
      borderRadius: `${active ? '0%' : '50%'}`,
      boxSizing: 'border-box',
      cursor: 'pointer',
    }}
  />;
}


ColorButton.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
};

ColorButton.defaultProps = {
  active: false,
};

export default ColorButton;
