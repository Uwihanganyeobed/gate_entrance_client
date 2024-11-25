// src/validation/computerSchemas.ts
import { z } from 'zod';

export const computerSchema = z.object({
  regNo: z
    .string()
    .regex(/^\d{9}$/, { message: 'Registration number must be 9 digits' })
    .optional(),
  nationalId: z
    .string()
    .regex(/^\d{16}$/, { message: 'National ID must be 16 digits' })
    .optional(),
  serialNo: z.string().min(1, { message: "serialNo cannot be empty" }),
  brand: z.string().min(1, { message: "brand cannot be empty" }),
  qrcode: z.string().optional(),
}).refine(data => data.regNo || data.nationalId, {
  message: "Either regNo or nationalId must be provided",
});

export type ComputerSchema = z.infer<typeof computerSchema>;