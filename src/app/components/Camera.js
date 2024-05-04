import React, { useRef, useEffect } from 'react';

const Camera = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Función para obtener el stream de la cámara
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        };

        getVideo();
    }, []);

    return <video ref={videoRef} autoPlay playsInline />;
};

export default Camera;
