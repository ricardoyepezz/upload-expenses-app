import React from 'react';

const InputComponent = ({ value, onChange, title }) => {
  return (
    <div>
      <label>{title}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default InputComponent;
