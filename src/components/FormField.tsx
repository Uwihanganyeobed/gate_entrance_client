// src/components/FormField.tsx
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

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
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          {...register(name)}
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
          readOnly={readOnly} // Apply readOnly to input
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;