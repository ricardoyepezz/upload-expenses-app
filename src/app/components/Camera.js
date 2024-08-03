import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import './../../App.css';

const Camera = ({ onPhotoUploaded }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [buttonEnable, setButtonEnable] = useState(false)

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' },
        focusMode: { ideal: 'continuous' },
      }
    }
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };
    getVideo();
  }, []);

  const takePhoto = (e) => {
    e.preventDefault();  // Previene el comportamiento predeterminado del botón
    e.stopPropagation();
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    canvasRef.current.toBlob(blob => {
      uploadFile(blob);
      setButtonEnable(true)  
    }, 'image/jpeg');
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://super-backend.vercel.app/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        onPhotoUploaded(data.url);
      })
      .catch(err => {
        console.error('Error uploading file:', err);
      });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <Button disabled={buttonEnable} className='mb-3' onClick={takePhoto}>Take Photo</Button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Camera;
