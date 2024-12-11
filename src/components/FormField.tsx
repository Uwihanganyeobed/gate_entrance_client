import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTheme } from "../context/ThemeContext";

interface FormFieldProps {
  label: string;
  type: "text" | "select" | "number" | "password" | "email";
  name: string;
  placeholder?: string;
  options?: string[];
  register: UseFormRegister<any>;
  error?: string;
  readOnly?: boolean; // Add readOnly prop
}

const FormField: FC<FormFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  options,
  register,
  error,
  readOnly = false, // Default to false
}) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className={`block font-semibold mb-2 text-${
          theme === "dark" ? "gray-300" : "gray-700"
        }`}
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          {...register(name)}
          className={`w-full p-2 border border-gray-300 rounded bg-${
            theme === "dark" ? "gray-600" : "white"
          } text-${theme === "dark" ? "gray-300" : "gray-700"}`}
          disabled={readOnly} // Disable select if readOnly
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full p-2 border border-gray-300 rounded bg-${
            theme === "dark" ? "gray-600" : "white"
          } text-${theme === "dark" ? "gray-300" : "gray-700"}`}
          readOnly={readOnly} // Apply readOnly to input
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;
