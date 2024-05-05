import React from 'react';

const TakePhotoButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      Take Photo
    </button>
  );
};

export default TakePhotoButton;
