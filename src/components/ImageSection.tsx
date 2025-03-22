// src/components/ImageSection.tsx
import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

interface ImageSectionProps {
  showWebcam: boolean;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setShowWebcam: React.Dispatch<React.SetStateAction<boolean>>;
  processImage: (imageUrl: string) => Promise<void>;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  showWebcam,
  selectedImage,
  setSelectedImage,
  setShowWebcam,
  processImage
}) => {
  const webcamRef = useRef<Webcam>(null);

  const captureWebcam = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setSelectedImage(imageSrc);
      processImage(imageSrc);
      setShowWebcam(false);
    }
  }, [webcamRef, processImage, setSelectedImage, setShowWebcam]);

  return (
    <div className="space-y-8">
      {showWebcam ? (
        <div className="relative">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg shadow-lg border border-white/20"
          />
          <button
            onClick={captureWebcam}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg"
          >
            Capture Image
          </button>
        </div>
      ) : selectedImage && (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full rounded-lg shadow-lg border border-white/20"
          />
        </div>
      )}
    </div>
  );
};

export default ImageSection;