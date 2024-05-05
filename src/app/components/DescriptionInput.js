import React from 'react';

const DescriptionInput = ({ value, onChange }) => {
  return (
    <div>
      <label>Description:</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default DescriptionInput;
