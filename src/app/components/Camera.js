// Camera.js
import React, { useRef, useEffect } from 'react';

const Camera = ({ onPhotoUploaded }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const constraints = { video: { facingMode: { ideal: 'environment' } } };
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

  const takePhoto = () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    canvasRef.current.toBlob(blob => {
      uploadFile(blob);
    }, 'image/jpeg');
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://upload-expenses-app.rj.r.appspot.com/upload', {
      method: 'POST',
      mode: 'cors', // Asegúrate de usar cors si tu backend lo requiere
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData,
    })
      .then(response => {
        return response.json(); // Asegúrate de procesar la respuesta como JSON
      }).then(data => {
        console.log(`File uploaded to ${data.url}`);
        onPhotoUploaded(data.url); // Pasar la URL de la imagen al formulario
      })
      .catch(err => {
        console.error('Error uploading file:', err);
      });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={takePhoto}>Take Photo</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Camera;
