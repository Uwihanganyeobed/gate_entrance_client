// src/components/CameraCapture.tsx
import { useRef, FC } from "react";
import Webcam from "react-webcam";

interface CameraCaptureProps {
  onCapture: (photo: File) => void;
}

const CameraCapture: FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const capturedPhoto = webcamRef.current.getScreenshot();
      if (capturedPhoto) {
        const byteString = atob(capturedPhoto.split(',')[1]);
        const mimeString = capturedPhoto.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], "capturedPhoto.jpg", { type: mimeString });
        onCapture(file);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">
        Capture Photo
      </label>
      <div className="flex flex-col items-center">
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
      </div>
    </div>
  );
};

export default CameraCapture;
