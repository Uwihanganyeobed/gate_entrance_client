// src/pages/RegisterComputer.tsx
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ComputerSchema, computerSchema } from '../validation/computerSchemas';
import FormField from '../components/FormField';
import { useRegisterComputer } from '../hooks/useRegisterComputer';
import { toast } from 'react-toastify';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@radix-ui/themes';

const RegisterComputer = () => {
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

  const { mutate, status } = useRegisterComputer('');

  const onSubmit = (data: ComputerSchema) => {
    const formData = new FormData();
    if (data.regNo) {
      formData.append('regNo', data.regNo.toString());
    }
    if (data.nationalId) {
      formData.append('nationalId', data.nationalId.toString());
    }
    formData.append('serialNo', data.serialNo);
    formData.append('brand', data.brand);
    formData.append('qrcode', data.qrcode || '');

    mutate(formData, {
      onSuccess: () => {
        reset();
        setUserType(null);
        toast.success('Computer registered successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.error || 'An error occurred';
        console.log(error);
        toast.error(`${errorMessage}`);
      },
    });
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
    setValue('regNo', undefined);
    setValue('nationalId', undefined);
  };

  useEffect(() => {
    let html5QrcodeScanner: Html5QrcodeScanner;

    if (isScanning) {
      html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 10,
          qrbox: 250,
        },
        /* verbose= */ false
      );

      html5QrcodeScanner.render(
        (decodedText: string) => {
          setValue('qrcode', decodedText);
          setIsScanning(false);
          html5QrcodeScanner.clear();
          toast.success('QR code scanned successfully!');
        },
        (error: any) => {
          console.log('Scan error:', error);
        }
      );
    }

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch((error: any) => {
          console.error('Error clearing QR Code scanner:', error);
        });
      }
    };
  }, [isScanning, setValue]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Register Computer</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="userType" className="block text-gray-700 font-semibold mb-2">
            User Type
          </label>
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
        <FormField
          label="QR Code"
          type="text"
          name="qrcode"
          placeholder="Scan QR code"
          register={register}
          error={errors.qrcode?.message}
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Scan QR Code</label>
          {isScanning ? (
            <div id="reader" style={{ width: '100%' }}></div>
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