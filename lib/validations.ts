import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please provide a valid email address.'),
  password: z
    .string()
    .min(6, 'Password must be at lest 6 characters log.')
    .max(20, 'Password cannot exceed 50 characters.'),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(30, { message: 'Username cannot exceed 30 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores.',
    }),

  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters and spaces.',
    }),

  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please provide a valid email address.' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
});

export const AddScaleSchema = z.object({
  uuid: z
    .string()
    .min(6, 'UUID should be at least 6 characters long.')
    .max(20, 'UUID must not exceed 20 characters.'),
  name: z
    .string()
    .min(6, 'Name should be at least 6 characters long.')
    .max(20, 'Name must not exceed 20 characters.'),
  fixture: z.number().int().positive(),
  row: z.enum(['Front', 'Back', 'Center']),
  location: z
    .string()
    .min(6, 'Location should be at least 6 characters long.')
    .max(20, 'Location must not exceed 20 characters.'),
  product: z.string().min(1, 'Product is required.'),
});
