// src/validation/computerSchemas.ts
import { z } from "zod";

export const computerSchema = z
  .object({
    regNo: z.number().optional(),
    nationalId: z.number().optional(),
    serialNo: z.string().min(1, { message: "serialNo cannot be empty" }),
    brand: z.string().min(1, { message: "brand cannot be empty" }),
  })
  .refine((data) => data.regNo || data.nationalId, {
    message: "Either regNo or nationalId must be provided",
  });

export type ComputerSchema = z.infer<typeof computerSchema>;
