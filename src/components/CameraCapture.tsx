// src/components/CameraCapture.tsx
import { useRef, useState, FC } from 'react';
import Webcam from 'react-webcam';
import { TailSpin } from 'react-loader-spinner';

interface CameraCaptureProps {
  onCapture: (photo: File) => void;
}

const CameraCapture: FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const capturePhoto = async () => {
    setIsCapturing(true);
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        // Convert the data URL to a File object
        const response = await fetch(screenshot);
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        onCapture(file);
        setCapturedPhoto(screenshot);
        setIsCameraOpen(false);
      }
    }
    setIsCapturing(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Capture Photo</label>
      <div className="flex flex-col items-center">
        {isCameraOpen ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full max-w-xs border border-gray-300 rounded mb-2"
            />
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={isCapturing}
            >
              {isCapturing ? (
                <div className="flex items-center">
                  <TailSpin height="20" width="20" color="#ffffff" ariaLabel="loading" />
                  Capturing...
                </div>
              ) : (
                'Take Photo'
              )}
            </button>
          </>
        ) : capturedPhoto ? (
          <img
            src={capturedPhoto}
            alt="Captured"
            className="w-full max-w-xs border border-gray-300 rounded mb-2"
          />
        ) : (
          <button
            type="button"
            onClick={openCamera}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;