// src/validation/schemas.ts
import { z } from 'zod';

export const registerUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    userType: z.enum(['Guest', 'Student'], { required_error: 'User type is required' }),
    registrationOrId: z
      .string()
      .min(1, 'Registration number or national ID is required'),
    photo: z
      .instanceof(File, { message: 'Photo is required' })
      .refine((file) => file.type.startsWith('image/'), 'Photo must be an image file'),
  })
  .superRefine((data, context) => {
    const { userType, registrationOrId } = data;
    if (userType === 'Guest' && !/^\d{16}$/.test(registrationOrId)) {
      context.addIssue({
        path: ['registrationOrId'],
        code: z.ZodIssueCode.custom,
        message: 'National ID must be 16 digits',
      });
    } else if (userType === 'Student' && !/^\d{9}$/.test(registrationOrId)) {
      context.addIssue({
        path: ['registrationOrId'],
        code: z.ZodIssueCode.custom,
        message: 'Registration number must be 9 digits',
      });
    }
  });

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;