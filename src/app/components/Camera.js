import React, { useRef, useEffect } from 'react';
import { storage, bucketName } from '../../api/googleStorage';
  
const Camera = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const constraints = {
            video: {
              facingMode: { ideal: 'environment' } // 'environment' se refiere a la cámara trasera
            }
          };
        // Función para obtener el stream de la cámara
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
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
            uploadFile(blob, storage, bucketName);
        }, 'image/jpeg');
    };

    const uploadFile = (file, storage, bucketName) => {
        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(`photo-${Date.now()}.jpg`);
        const blobStream = blob.createWriteStream({
          resumable: true,
          metadata: {
            contentType: 'image/jpeg',
          },
        });
  
        blobStream.on('error', err => console.error('Error uploading file:', err));
        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log(`File uploaded to ${publicUrl}`);
        });
  
        blobStream.end(file);
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
