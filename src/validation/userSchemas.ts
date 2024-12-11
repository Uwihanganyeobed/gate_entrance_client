// src/validation/schemas.ts
import { z } from "zod";

export const registerUserSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    userType: z
      .enum(["guest", "student", ""], {
        required_error: "Please choose student or guest",
        invalid_type_error: "Invalid user type. Please choose student or guest",
      })
      .refine((value) => value !== "", {
        message: "Please choose student or guest",
      }),
    registrationOrId: z
      .string()
      .min(1, "Registration number or national ID is required"),
    photo: z
      .instanceof(File, { message: "Photo is required" })
      .refine(
        (file) => file.type.startsWith("image/"),
        "Photo must be an image file"
      ),
  })
  .superRefine((data, context) => {
    const { userType, registrationOrId } = data;
    if (userType === "guest" && !/^\d{16}$/.test(registrationOrId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "National ID must be 16 digits",
        path: ["registrationOrId"],
      });
    } else if (userType === "student" && !/^\d{9}$/.test(registrationOrId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration number must be 9 digits",
        path: ["registrationOrId"],
      });
    }
  });

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
