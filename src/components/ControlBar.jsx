import React from 'react';
import PropTypes from 'prop-types';

const ControlBar = ({ onNew, onSave, onPrint, disabled }) => {
  return (
    <div className='menu'>
      <button onClick={onNew}>New</button>
      {/*<button onClick={onInsert}>Insert</button>*/}
      <button onClick={onSave} disabled={disabled}>Save</button>
      <button onClick={onPrint}>Print</button>
    </div>
  );
};

ControlBar.propTypes = {
  onNew: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  disabled: PropTypes.bool, 
};

export default ControlBar;
