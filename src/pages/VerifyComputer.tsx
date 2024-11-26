// src/pages/VerifyComputer.tsx
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useVerifyComputer } from "../hooks/useVerifyComputer";
import { toast } from "react-toastify";
import { Button, Card, Text, Flex } from "@radix-ui/themes";

const VerifyComputer = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);
  const [isCardDisplayed, setIsCardDisplayed] = useState<boolean>(false);
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
              setIsCardDisplayed(true);
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
          .catch((error: any) => {
            console.error("Error clearing QR scanner on unmount:", error);
          });
      }
    };
  }, [isScanning, refetch]);

  const startScanning = () => {
    if (isCardDisplayed) {
      setQrCodeContent(null);
      setIsCardDisplayed(false);
    } else {
      setIsScanning(true);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Verify Computer
      </h1>
      <div className="flex justify-center mb-6">
        <Button
          onClick={startScanning}
          className="px-6 py-3 bg-gray-800 text-white text-lg font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200"
        >
          {isCardDisplayed ? "Scan Again" : "Start Scanning"}
        </Button>
      </div>
      {isScanning && (
        <div
          id="reader"
          className="mx-auto"
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "300px",
            border: "2px solid #ddd",
            borderRadius: "8px",
          }}
        ></div>
      )}
      {data && (
        <Card
          variant="classic"
          className="mt-8 mx-auto max-w-lg p-6 border border-gray-300 rounded-lg shadow-md bg-white"
        >
          <Flex direction="column" align="center">
            <img
              src={data.photoLink}
              alt="User Photo"
              className="w-full h-auto mb-6 rounded-lg object-cover"
            />
            <div className="text-left w-full">
              <Text className="text-xl font-bold text-gray-800 mb-1">
                Names:
              </Text>
              <Text className="text-lg text-gray-700 mb-4">{data.names}</Text>

              <Text className="text-xl font-bold text-gray-800 mb-1">
                {data.regNo ? "Reg No:" : "National ID:"}
              </Text>
              <Text className="text-lg text-gray-700 mb-4">
                {data.regNo ? data.regNo : data.nationalId}
              </Text>

              <Text className="text-xl font-bold text-gray-800 mb-1">
                Serial No:
              </Text>
              <Text className="text-lg text-gray-700">{data.serialNo}</Text>
            </div>
          </Flex>
        </Card>
      )}
      {error && (
        <div className="mt-8 p-4 border rounded-lg shadow-md bg-red-100 text-red-700 max-w-lg mx-auto">
          <Text>Error: {error?.message}</Text>
        </div>
      )}
    </main>
  );
};

export default VerifyComputer;