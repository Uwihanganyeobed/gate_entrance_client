import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useVerifyComputer } from "../hooks/useVerifyComputer";
import { toast } from "react-toastify";
import { Button, Card, Text, Flex } from "@radix-ui/themes";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next'; // Importing useTranslation

const VerifyComputer = () => {
  const { theme } = useTheme(); // Get the current theme
  const { t } = useTranslation(); // Get the translation function
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);
  const [isCardDisplayed, setIsCardDisplayed] = useState<boolean>(false);
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const { data, error, isLoading } = useVerifyComputer(qrCodeContent || "");

  useEffect(() => {
    if (qrCodeContent) {
      if (error) {
        toast.error(t("No computer found for the scanned QR code.")); // Using translation
        setIsCardDisplayed(false);
      } else if (data) {
        setIsCardDisplayed(true);
      }
    }
  }, [qrCodeContent, data, error, t]);

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
              toast.success(t("QR code scanned successfully!")); // Using translation
            })
            .catch((error: any) => {
              console.error("Error clearing QR scanner:", error);
              toast.error(t("Failed to clear the QR scanner.")); // Using translation
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
  }, [isScanning, t]);

  const startScanning = () => {
    if (isCardDisplayed) {
      setQrCodeContent(null);
      setIsCardDisplayed(false);
    } else {
      setIsScanning(true);
    }
  };

  return (
    <main className={`p-4 bg-${theme === 'dark' ? 'gray-800' : 'white'} w-full h-full ${!isScanning ? 'min-h-screen' : ''} pb-20`}>
      <h1 className={`text-3xl font-bold text-center mb-8 text-${theme === 'dark' ? 'white' : 'gray-800'}`}>
        {t("Verify Computer")} {/* Using translation */}
      </h1>
      <div className="flex justify-center mb-6">
        <Button
          onClick={startScanning}
          className={`px-6 py-3 bg-${theme === 'dark' ? 'gray-600' : 'gray-800'} text-white text-lg font-medium rounded-lg hover:bg-${theme === 'dark' ? 'gray-700' : 'gray-900'} transition-colors duration-200`}
        >
          {isCardDisplayed ? t("Scan Again") : t("Start Scanning")} {/* Using translation */}
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
          <Text>{t("Loading...")}</Text> {/* Using translation */}
        </div>
      )}
      {data && isCardDisplayed && (
        <Card
          variant="classic"
          className={`mt-8 mx-auto max-w-lg p-6 border border-gray-300 rounded-lg shadow-md bg-${theme === 'dark' ? 'gray-700' : 'white'}`}
        >
          <Flex direction="column" align="center">
            <img
              src={data.photoLink}
              alt={t("User Photo")} // Using translation
              className="w-full h-auto mb-6 rounded-lg object-cover"
            />
            <div className="text-left w-full space-y-4">
              <div>
                <Text className={`text-xl font-bold text-${theme === 'dark' ? 'white' : 'gray-800'}`}>{t("Names:")}</Text> {/* Using translation */}
                <Text className={`text-lg text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>{data.names}</Text>
              </div>
              <div>
                <Text className={`text-xl font-bold text-${theme === 'dark' ? 'white' : 'gray-800'}`}>
                  {data.regNo ? t("Reg No:") : t("National ID:")} {/* Using translation */}
                </Text>
                <Text className={`text-lg text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>
                  {data.regNo ? data.regNo : data.nationalId}
                </Text>
              </div>
              <div>
                <Text className={`text-xl font-bold text-${theme === 'dark' ? 'white' : 'gray-800'}`}>{t("Serial No:")}</Text> {/* Using translation */}
                <Text className={`text-lg text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>{data.serialNo}</Text>
              </div>
            </div>
          </Flex>
        </Card>
      )}
    </main>
  );
};

export default VerifyComputer;