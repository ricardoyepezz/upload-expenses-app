import React from 'react';
import { Form } from 'react-bootstrap';


const DescriptionInput = ({ value, onChange }) => {
  return (
    <div>
      <Form.Control className='mb-3' size="lg" type="text" placeholder="Description" value={value} onChange={onChange}/>
    </div>
  );
};

export default DescriptionInput;
