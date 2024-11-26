// src/pages/RegisterUser.tsx
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterUserSchema, registerUserSchema } from '../validation/userSchemas';
import FormField from '../components/FormField';
import CameraCapture from '../components/CameraCapture';
import { useRegisterUser } from '../hooks/useRegisterUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const { mutate, status } = useRegisterUser();

  const handleCapture = (capturedPhoto: File) => {
    setPhoto(capturedPhoto);
    setValue('photo', capturedPhoto); // Include 'photo' in the form data
  };

  const onSubmit = (data: RegisterUserSchema) => {
    const formData = new FormData();
    formData.append('name', `${data.firstName} ${data.lastName}`);
    formData.append('type', data.userType);
    if (data.userType === 'student') {
      formData.append('regNo', data.registrationOrId);
    } else {
      formData.append('nationalId', data.registrationOrId);
    }
    if (photo) {
      formData.append('photo', photo);
    }

    mutate(formData, {
      onSuccess: () => {
        reset();
        setPhoto(null);
        toast.success('User registered successfully!');
        setTimeout(() => {
          navigate('/'); // Go to the home page
        }, 3000); // 3 seconds delay
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.error || 'An error occurred';
        console.log(error);
        toast.error(`${errorMessage}`);
      },
    });
  };

  const userType = watch('userType');

  return (
    <main className="container mx-auto p-4">
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
          options={['guest', 'student']}
          register={register}
          error={errors.userType?.message}
        />
        <FormField
          label="Registration No / National ID"
          type="number"
          name="registrationOrId"
          placeholder={
            userType === 'guest'
              ? 'Enter your National ID (16 digits)'
              : 'Enter your Registration Number (9 digits)'
          }
          register={register}
          error={errors.registrationOrId?.message}
        />
        <CameraCapture onCapture={handleCapture} />
        {errors.photo && <p className="text-red-500 text-sm mb-4">{errors.photo.message}</p>}
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

export default RegisterUser;