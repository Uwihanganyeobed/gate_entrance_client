// src/components/CameraCapture.tsx
import { useRef, useState, FC } from 'react';
import Webcam from 'react-webcam';

interface CameraCaptureProps {
  onCapture: (photo: File) => void;
}

const CameraCapture: FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const capturePhoto = async () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        // Convert data URL to File object
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
      <label className="block text-gray-700 font-semibold mb-2">
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
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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