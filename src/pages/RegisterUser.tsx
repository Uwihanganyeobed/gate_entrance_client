import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterUserSchema,
  registerUserSchema,
} from "../validation/userSchemas";
import FormField from "../components/FormField";
import CameraCapture from "../components/CameraCapture";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next"; // Importing useTranslation

const RegisterUser = () => {
  const { theme } = useTheme(); // Get the current theme
  const { t } = useTranslation(); // Get the translation function
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
    setValue("photo", capturedPhoto); // Include 'photo' in the form data
  };

  const onSubmit = (data: RegisterUserSchema) => {
    const formData = new FormData();
    formData.append("name", `${data.firstName} ${data.lastName}`);
    formData.append("type", data.userType);
    if (data.userType === "student") {
      formData.append("regNo", data.registrationOrId);
    } else {
      formData.append("nationalId", data.registrationOrId);
    }
    if (photo) {
      formData.append("photo", photo);
    }

    mutate(formData, {
      onSuccess: () => {
        reset();
        setPhoto(null);
        toast.success(t("User registered successfully!")); // Using translation
        setTimeout(() => {
          navigate("/"); // Go to the home page
        }, 3000); // 3 seconds delay
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.error || t("An error occurred."); // Using translation
        console.log(error);
        toast.error(`${errorMessage}`);
      },
    });
  };

  const userType = watch("userType");

  return (
    <main
      className={`p-4 bg-${theme === "dark" ? "gray-800" : "white"} w-full`}
    >
      <h1
        className={`text-3xl font-bold text-center mb-8 text-${
          theme === "dark" ? "white" : "text-primary"
        }`}
      >
        {t("Register User")} {/* Using translation */}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-lg mx-auto bg-${
          theme === "dark" ? "gray-700" : "white"
        } p-6 rounded shadow-md`}
      >
        <FormField
          label={t("First Name")} // Using translation
          type="text"
          name="firstName"
          placeholder={t("example: Lorem")} // Using translation
          register={register}
          error={errors.firstName?.message}
        />
        <FormField
          label={t("Last Name")} // Using translation
          type="text"
          name="lastName"
          placeholder={t("example: Lama")} // Using translation
          register={register}
          error={errors.lastName?.message}
        />
        <FormField
          label={t("User Type")} // Using translation
          type="select"
          name="userType"
          options={[t("Guest"), t("Student")]} // Using translation
          register={register}
          error={errors.userType?.message}
        />
        <FormField
          label={t("Registration No / National ID")} // Using translation
          type="number"
          name="registrationOrId"
          placeholder={
            userType === "guest"
              ? t("Enter your National ID (16 digits)") // Using translation
              : t("Enter your Registration Number (9 digits)") // Using translation
          }
          register={register}
          error={errors.registrationOrId?.message}
        />
        <CameraCapture onCapture={handleCapture} />
        {errors.photo && (
          <p className="text-red-500 text-sm mb-4">{errors.photo.message}</p>
        )}
        <button
          type="submit"
          className={`bg-primary text-white px-4 py-2 rounded hover:bg-secondary mt-4`}
          disabled={status === "pending"}
        >
          {status === "pending" ? t("Submitting...") : t("Register")}{" "}
          {/* Using translation */}
        </button>
      </form>
    </main>
  );
};

export default RegisterUser;
