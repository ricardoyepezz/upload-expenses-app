import React from 'react';
import { Form } from 'react-bootstrap'

const AmountInput = ({ value, onChange }) => {
  return (
    <div>
      <Form.Control className='mb-3' size="lg" placeholder="Amount" type="number" value={value} onChange={onChange} min="0.01" step="0.01" />
    </div>
  );
};

export default AmountInput;
