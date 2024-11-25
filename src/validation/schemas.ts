// src/validation/schemas.ts
import { z } from 'zod';

export const registerUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  userType: z.enum(['Guest', 'Student']).refine((val) => val !== undefined, {
    message: 'User type is required',
  }),
  registrationOrId: z.string(),
  photo: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), 'Photo must be an image file'),
}).superRefine((data, ctx) => {
  if (data.userType === 'Guest' && (!/^\d{16}$/.test(data.registrationOrId))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['registrationOrId'],
      message: 'Invalid national ID for Guest',
    });
  }
  if (data.userType === 'Student' && (!/^\d{9}$/.test(data.registrationOrId))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['registrationOrId'],
      message: 'Invalid registration number for Student',
    });
  }
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;