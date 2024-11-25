// src/validation/computerSchemas.ts

import { z } from "zod";

export const computerSchema = z.object({
  regNo: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || !Number.isNaN(val), {
      message: "Registration Number must be a number",
    })
    .refine((val) => val === undefined || /^\d{9}$/.test(String(val)), {
      message: "Registration Number must be exactly 9 digits",
    }),
  nationalId: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || !Number.isNaN(val), {
      message: "National ID must be a number",
    })
    .refine((val) => val === undefined || /^\d{16}$/.test(String(val)), {
      message: "National ID must be exactly 16 digits",
    }),
  brand: z.string().min(1, { message: "Brand is required" }),
  serialNo: z.string().min(1, { message: "Serial No is required" }),
});

export type ComputerSchema = z.infer<typeof computerSchema>;
