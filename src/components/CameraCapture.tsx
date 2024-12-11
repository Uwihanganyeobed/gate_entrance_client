// src/components/CameraCapture.tsx
import { useRef, useState, FC } from 'react';
import Webcam from 'react-webcam';
import { useTheme } from '../context/ThemeContext';

interface CameraCaptureProps {
  onCapture: (photo: File) => void;
}

const CameraCapture: FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { theme } = useTheme();

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const capturePhoto = async () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        const response = await fetch(screenshot);
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        onCapture(file);
        setCapturedPhoto(screenshot);
        setIsCameraOpen(false);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className={`block font-semibold mb-2 text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>
        Capture Photo
      </label>
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
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600`}
            >
              Take Photo
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
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
          >
            Open Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;