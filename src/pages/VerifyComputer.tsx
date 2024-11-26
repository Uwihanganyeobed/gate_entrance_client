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

  // Fetch data only when qrCodeContent is available
  const { data, error, isLoading } = useVerifyComputer(qrCodeContent || "");

  useEffect(() => {
    if (qrCodeContent) {
      if (error) {
        // Display error message using toast
        toast.error(error.message || "No computer found for the scanned QR code.");
        setIsCardDisplayed(false);
      } else if (data) {
        setIsCardDisplayed(true);
      }
    }
  }, [qrCodeContent, data, error]);

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
  }, [isScanning]);

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
      {isLoading && (
        <div className="text-center mt-4">
          <Text>Loading...</Text>
        </div>
      )}
      {data && isCardDisplayed && (
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
            <div className="text-left w-full space-y-4">
              <div>
                <Text className="text-xl font-bold text-gray-800">Names:</Text>
                <Text className="text-lg text-gray-700">{data.names}</Text>
              </div>
              <div>
                <Text className="text-xl font-bold text-gray-800">
                  {data.regNo ? "Reg No:" : "National ID:"}
                </Text>
                <Text className="text-lg text-gray-700">
                  {data.regNo ? data.regNo : data.nationalId}
                </Text>
              </div>
              <div>
                <Text className="text-xl font-bold text-gray-800">Serial No:</Text>
                <Text className="text-lg text-gray-700">{data.serialNo}</Text>
              </div>
            </div>
          </Flex>
        </Card>
      )}
    </main>
  );
};

export default VerifyComputer;