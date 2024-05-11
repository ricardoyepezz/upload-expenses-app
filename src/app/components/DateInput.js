import React from 'react';
import { Form } from 'react-bootstrap';

const DateInput = ({ value, onChange }) => {
  return (
    <div>
      <Form.Control className='mb-3' size="lg" type="date" placeholder="Date" value={value} onChange={onChange}/>
    </div>
  );
};

export default DateInput;
