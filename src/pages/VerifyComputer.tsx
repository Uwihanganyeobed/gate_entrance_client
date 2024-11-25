// src/pages/VerifyComputer.tsx
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useVerifyComputer } from "../hooks/useVerifyComputer";
import { toast } from "react-toastify";
import { Button } from "@radix-ui/themes";

const VerifyComputer = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const { data, error, refetch } = useVerifyComputer(qrCodeContent || "");

  useEffect(() => {
    if (isScanning) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      html5QrcodeScanner.render(
        (decodedText: string) => {
          setQrCodeContent(decodedText);
          setIsScanning(false);
          html5QrcodeScanner
            .clear()
            .then(() => {
              toast.success("QR code scanned successfully!");
              refetch();
            })
            .catch((error: any) => {
              console.error("Error clearing QR scanner:", error);
              toast.error("Failed to clear the QR scanner.");
            });
        },
        (error: any) => {
          console.error("QR Scan Error:", error);
        }
      );

      html5QrcodeScannerRef.current = html5QrcodeScanner;
    }

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current
          .clear()
          .then(() => {
            console.log("QR scanner cleared on component unmount.");
          })
          .catch((error: any) => {
            console.error("Error clearing QR scanner on unmount:", error);
          });
      }
    };
  }, [isScanning, refetch]);

  const clearScreen = () => {
    setQrCodeContent(null);
    refetch();
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Verify Computer
      </h1>
      <div className="flex justify-center mb-4">
        <Button
          onClick={() => setIsScanning(true)}
          className="relative inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Scanning
        </Button>
      </div>
      {isScanning && (
        <div
          id="reader"
          style={{
            width: "100%",
            height: "300px",
            border: "2px solid #ddd",
            borderRadius: "8px",
          }}
        ></div>
      )}
      {data && (
        <div className="mt-4 p-4 border rounded shadow-md bg-white">
          <img
            src={data.photoLink}
            alt="User Photo"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-center text-lg font-semibold">{data.names}</p>
          <p className="text-center text-sm text-gray-600">
            {data.regNo
              ? `Reg No: ${data.regNo}`
              : `National ID: ${data.nationalId}`}
          </p>
          <p className="text-center text-sm text-gray-600">
            Serial No: {data.serialNo}
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 border rounded shadow-md bg-red-100 text-red-700">
          <p>Error: {error.message}</p>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Button
          onClick={clearScreen}
          className="relative inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Screen
        </Button>
      </div>
    </main>
  );
};

export default VerifyComputer;
