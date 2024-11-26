// src/pages/RegisterComputer.tsx
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

const RegisterComputer = () => {
  const navigate = useNavigate();
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
      toast.error("Please scan a QR code before submitting.");
      return;
    }

    // Create an object with only the required fields
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
          toast.success("Computer registered successfully!");
          setTimeout(() => {
            navigate('/');
          }, 3000);
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.error || "An error occurred";
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
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Register Computer
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="userType"
            className="block text-gray-700 font-semibold mb-2"
          >
            User Type
          </label>
          <select
            id="userType"
            name="userType"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleUserTypeChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select User Type
            </option>
            <option value="student">Student</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        {userType === "student" && (
          <FormField
            label="Registration No"
            type="number"
            name="regNo"
            placeholder="Enter your registration number"
            register={register}
            error={errors.regNo?.message}
          />
        )}
        {userType === "guest" && (
          <FormField
            label="National ID"
            type="number"
            name="nationalId"
            placeholder="Enter your national ID"
            register={register}
            error={errors.nationalId?.message}
          />
        )}
        <FormField
          label="Serial No"
          type="text"
          name="serialNo"
          placeholder="Enter the serial number"
          register={register}
          error={errors.serialNo?.message}
        />
        <FormField
          label="Brand"
          type="text"
          name="brand"
          placeholder="Enter the brand"
          register={register}
          error={errors.brand?.message}
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Scan QR Code
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
              className="relative inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start Scanning
            </Button>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary mt-4 disabled:opacity-50"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Submitting..." : "Register"}
        </button>
      </form>
    </main>
  );
};

export default RegisterComputer;
