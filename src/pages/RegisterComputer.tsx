import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComputerSchema, computerSchema } from "../validation/computerSchemas";
import { useRegisterComputer } from "../hooks/useRegisterComputer";
import FormField from "../components/FormField";
import { toast } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next"; // Importing useTranslation

const RegisterComputer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme
  const { t } = useTranslation(); // Get the translation function
  const [userType, setUserType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);

  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ComputerSchema>({
    resolver: zodResolver(computerSchema),
  });

  const { mutate, status } = useRegisterComputer();

  const onSubmit = (data: ComputerSchema) => {
    if (!qrCodeContent) {
      toast.error(t("Please scan a QR code before submitting.")); // Using translation
      return;
    }

    const requestData: ComputerSchema = {
      brand: data.brand,
      serialNo: data.serialNo,
      regNo: userType === "student" ? Number(data.regNo) : undefined,
      nationalId: userType === "guest" ? Number(data.nationalId) : undefined,
    };

    mutate(
      { data: requestData, qrCodeContent },
      {
        onSuccess: () => {
          reset();
          setUserType(null);
          setQrCodeContent(null);
          toast.success(t("Computer registered successfully!")); // Using translation
          setTimeout(() => {
            navigate("/");
          }, 3000);
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.error || t("An error occurred."); // Using translation
          console.error("Registration Error:", error);
          toast.error(`${errorMessage}`);
        },
      }
    );
  };

  const handleUserTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserType(event.target.value);
    setValue("regNo", undefined);
    setValue("nationalId", undefined);
  };

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
          .then(() => {
            console.log("QR scanner cleared on component unmount.");
          })
          .catch((error: any) => {
            console.error("Error clearing QR scanner on unmount:", error);
          });
      }
    };
  }, [isScanning]);

  return (
    <main
      className={`p-4 bg-${theme === "dark" ? "gray-800" : "white"} w-full`}
    >
      <h1
        className={`text-3xl font-bold text-center mb-8 text-${
          theme === "dark" ? "white" : "text-primary"
        }`}
      >
        {t("Register Computer")} {/* Using translation */}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-lg mx-auto bg-${
          theme === "dark" ? "gray-700" : "white"
        } p-6 rounded shadow-md`}
      >
        <div className="mb-4">
          <label
            htmlFor="userType"
            className={`block font-semibold mb-2 text-${
              theme === "dark" ? "gray-300" : "gray-700"
            }`}
          >
            {t("User Type")} {/* Using translation */}
          </label>
          <select
            id="userType"
            name="userType"
            className={`w-full p-2 border border-gray-300 rounded bg-${
              theme === "dark" ? "gray-600" : "white"
            } text-${theme === "dark" ? "gray-300" : "gray-700"}`}
            onChange={handleUserTypeChange}
            defaultValue=""
          >
            <option value="" disabled>
              {t("Select User Type")} {/* Using translation */}
            </option>
            <option value="student">{t("Student")}</option>{" "}
            {/* Using translation */}
            <option value="guest">{t("Guest")}</option>{" "}
            {/* Using translation */}
          </select>
        </div>
        {userType === "student" && (
          <FormField
            label={t("Registration No")} // Using translation
            type="number"
            name="regNo"
            placeholder={t("Enter your Registration Number (9 digits)")} // Using translation
            register={register}
            error={errors.regNo?.message}
          />
        )}
        {userType === "guest" && (
          <FormField
            label={t("National ID")} // Using translation
            type="number"
            name="nationalId"
            placeholder={t("Enter your National ID")} // Using translation
            register={register}
            error={errors.nationalId?.message}
          />
        )}
        <FormField
          label={t("Serial No")} // Using translation
          type="text"
          name="serialNo"
          placeholder={t("Enter the serial number")} // Using translation
          register={register}
          error={errors.serialNo?.message}
        />
        <FormField
          label={t("Brand")} // Using translation
          type="text"
          name="brand"
          placeholder={t("Enter the brand")} // Using translation
          register={register}
          error={errors.brand?.message}
        />
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 text-${
              theme === "dark" ? "gray-300" : "gray-700"
            }`}
          >
            {t("Scan QR Code")} {/* Using translation */}
          </label>
          {isScanning ? (
            <div
              id="reader"
              style={{
                width: "100%",
                height: "300px",
                border: "2px solid #ddd",
                borderRadius: "8px",
              }}
            ></div>
          ) : (
            <Button
              onClick={() => setIsScanning(true)}
              className={`relative inline-flex items-center px-4 py-2 bg-${
                theme === "dark" ? "blue-600" : "blue-500"
              } text-white rounded hover:bg-${
                theme === "dark" ? "blue-700" : "blue-600"
              }`}
            >
              {t("Start Scanning")} {/* Using translation */}
            </Button>
          )}
        </div>
        <button
          type="submit"
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-400"
              : "bg-primary text-white hover:bg-secondary"
          } px-4 py-2 rounded mt-10 disabled:opacity-50`}
          disabled={status === "pending"}
        >
          {status === "pending" ? t("Submitting...") : t("Register")}{" "}
          {/* Using translation */}
        </button>
      </form>
    </main>
  );
};

export default RegisterComputer;
