import React from 'react';
import { Form } from 'react-bootstrap'

const CategoryDropdown = ({ value, onChange }) => {
  return (

    <div>
    
      <Form.Select className='mb-3' size="lg" value={value} onChange={onChange}>
        <option>Select a category</option>
        <option value="Adriana travel expenses">Adriana travel expenses</option>
        <option value="AQC travel expenses">AQC travel expenses</option>
        <option value="Operation logistic and EPP">Operation logistic and EPP</option>
        <option value="Other (machine, spare parts, etc">Other (machine, spare parts, etc)</option>
      </Form.Select>
    </div>
  );
};

export default CategoryDropdown;
