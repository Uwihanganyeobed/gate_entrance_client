// src/pages/VerifyComputer.tsx
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useVerifyComputer } from "../hooks/useVerifyComputer";
import { toast } from "react-toastify";
import { Button, Card, Text, Box, Flex } from "@radix-ui/themes";

const VerifyComputer = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const { data, error, refetch } = useVerifyComputer(qrCodeContent || "");

  useEffect(() => {
    if (isScanning) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
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
          if (error.name !== "NotFoundException") {
            console.error("QR Scan Error:", error);
            toast.error("Error scanning QR code. Please try again.");
          }
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

  const startScanning = () => {
    setQrCodeContent(null);
    setIsScanning(true);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Verify Computer
      </h1>
      <div className="flex justify-center mb-4">
        <Button
          onClick={startScanning}
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
            maxWidth: "500px",
            height: "300px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        ></div>
      )}
      {data && (
        <Card className="mt-4 p-4 border rounded shadow-md bg-white">
          <Flex direction="column" align="center">
            <img
              src={data.photoLink}
              alt="User Photo"
              className="w-32 h-32 rounded-full mb-4"
            />
            <Text className="text-lg font-semibold">{data.names}</Text>
            <Text className="text-sm text-gray-600">
              {data.regNo
                ? `Reg No: ${data.regNo}`
                : `National ID: ${data.nationalId}`}
            </Text>
            <Text className="text-sm text-gray-600">
              Serial No: {data.serialNo}
            </Text>
          </Flex>
        </Card>
      )}
      {error && (
        <Box className="mt-4 p-4 border rounded shadow-md bg-red-100 text-red-700">
          <Text>Error: {error.message}</Text>
        </Box>
      )}
    </main>
  );
};

export default VerifyComputer;
