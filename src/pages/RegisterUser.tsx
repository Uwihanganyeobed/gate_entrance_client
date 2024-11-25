// src/pages/RegisterUser.tsx
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerUserSchema, RegisterUserSchema } from '../validation/schemas';
import FormField from '../components/FormField';
import CameraCapture from '../components/CameraCapture';

const RegisterUser = () => {
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const handleCapture = (capturedPhoto: File) => {
    setPhoto(capturedPhoto);
    setValue('photo', capturedPhoto);
  };

  const onSubmit = (data: RegisterUserSchema) => {
    console.log('Form Data:', data);
  };

  const userType = watch('userType');

  return (
    <main className="flex-grow container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Register User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <FormField
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          register={register}
          error={errors.firstName?.message}
        />
        <FormField
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          register={register}
          error={errors.lastName?.message}
        />
        <FormField
          label="User Type"
          type="select"
          name="userType"
          options={['Guest', 'Student']}
          register={register}
          error={errors.userType?.message}
        />
        <FormField
          label="Registration No / National ID"
          type="text"
          name="registrationOrId"
          placeholder={`Enter your ${userType === 'Guest' ? 'national ID (16 digits)' : 'registration number (9 digits)'}`}
          register={register}
          error={errors.registrationOrId?.message}
        />
        <CameraCapture onCapture={handleCapture} />
        {errors.photo && <p className="text-red-500 text-sm mb-4">{errors.photo.message}</p>}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">
          Register
        </button>
      </form>
    </main>
  );
};

export default RegisterUser;
