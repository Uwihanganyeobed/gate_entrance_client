// src/pages/RegisterComputer.tsx
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ComputerSchema, computerSchema } from "../validation/computerSchemas";
import FormField from "../components/FormField";
import { useRegisterComputer } from "../hooks/useRegisterComputer";
import { toast } from "react-toastify";
import QrScanner from "react-qr-scanner";
import { Button, Spinner } from "@radix-ui/themes";

const RegisterComputer = () => {
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ComputerSchema>({
    resolver: zodResolver(computerSchema),
  });

  const { mutate, status } = useRegisterComputer(qrCodeContent || "");

  const onSubmit = (data: ComputerSchema) => {
    const formData = new FormData();
    if (data.regNo) {
      formData.append("regNo", data.regNo.toString());
    }
    if (data.nationalId) {
      formData.append("nationalId", data.nationalId.toString());
    }
    formData.append("serialNo", data.serialNo);
    formData.append("brand", data.brand);

    mutate(formData, {
      onSuccess: () => {
        reset();
        setQrCodeContent(null);
        setUserType(null);
        toast.success("Computer registered successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after a delay
        }, 3000); // 3 seconds delay
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.error || "An error occurred";
        console.log(error);
        toast.error(`${errorMessage}`);
      },
    });
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setQrCodeContent(data);
      setIsScanning(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    toast.error("Error scanning QR code");
    setIsScanning(false);
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
    setValue("regNo", undefined);
    setValue("nationalId", undefined);
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Register Computer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="userType" className="block text-gray-700 font-semibold mb-2">User Type</label>
          <select
            id="userType"
            name="userType"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleUserTypeChange}
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        {userType === 'student' && (
          <FormField
            label="Registration No"
            type="number"
            name="regNo"
            placeholder="Enter your registration number"
            register={register}
            error={errors.regNo?.message}
          />
        )}
        {userType === 'guest' && (
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
          <label className="block text-gray-700 font-semibold mb-2">Scan QR Code</label>
          {isScanning ? (
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          ) : (
            <Button onClick={startScanning} className="relative inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-4 h-4 bg-white rounded-full animate-ping"></span>
                <span className="w-4 h-4 bg-white rounded-full"></span>
              </span>
              <span className="relative">Start Scanning</span>
            </Button>
          )}
          {qrCodeContent && <p className="text-green-500 text-sm mt-2">QR Code Content: {qrCodeContent}</p>}
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary mt-4"
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </main>
  );
};

export default RegisterComputer;