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
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            onPhotoUploaded(data.url);  // Notifica a ExpenseForm la URL de la imagen subida
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
