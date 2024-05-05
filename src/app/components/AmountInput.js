import React from 'react';

const AmountInput = ({ value, onChange }) => {
  return (
    <div>
      <label>Amount ($):</label>
      <input type="number" value={value} onChange={onChange} min="0.01" step="0.01" />
    </div>
  );
};

export default AmountInput;
