import React from 'react';

const DateInput = ({ value, onChange }) => {
  return (
    <div>
      <label>Date:</label>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
};

export default DateInput;
