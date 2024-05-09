import React from 'react';

const CategoryDropdown = ({ value, onChange }) => {
  return (
    <div>
      <label>Category:</label>
      <select value={value} onChange={onChange}>
        <option value="">Select a category</option>
        <option value="Adriana travel expenses">Adriana travel expenses</option>
        <option value="AQC travel expenses">AQC travel expenses</option>
        <option value="Operation logistic and EPP">Operation logistic and EPP</option>
        <option value="Other (machine, spare parts, etc">Other (machine, spare parts, etc)</option>
      </select>
    </div>
  );
};

export default CategoryDropdown;
