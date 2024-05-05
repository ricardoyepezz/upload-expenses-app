import React from 'react';

const CategoryDropdown = ({ value, onChange }) => {
  return (
    <div>
      <label>Category:</label>
      <select value={value} onChange={onChange}>
        <option value="">Select a category</option>
        <option value="food">Adriana travel expenses</option>
        <option value="travel">AQC travel expenses</option>
        <option value="other">Operation logistic and EPP</option>
        <option value="other">Other (machine, spare parts, etc)</option>
      </select>
    </div>
  );
};

export default CategoryDropdown;
