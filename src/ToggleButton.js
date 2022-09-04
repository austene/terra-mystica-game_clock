import './ToggleButton.css';
import React from 'react';

const ToggleButton = ( {onToggle} ) => {
  return (
    <div className='toggle-button'>
      <label className='switch'>
        <input type='checkbox' onClick={onToggle}/>
        <span className='slider round'></span>
      </label>
    </div>
  );
};

export default ToggleButton;
