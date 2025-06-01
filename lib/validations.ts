import { number, z } from 'zod';

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

export const LocationSchema = z.object({
  fixture: z.number().nonnegative(),
  row: z.enum(['Front', 'Back', 'Center']),
  location_name: z
    .string()
    .min(6, 'Location should be at least 6 characters long.')
    .max(20, 'Location must not exceed 20 characters.'),
});

export const ProductSchema = z
  .object({
    product_name: z
      .string()
      .min(6, 'Product should be at least 6 characters long.')
      .max(30, 'Product must not exceed 30 characters.'),
    // product_plu: number().nonnegative('4 or 6 digit PLU code is required.'),
    product_plu: number().int().nonnegative(),
    image: z.string().nonempty('Product image is required.'),
    weight_unit: z.enum(['lbs', 'kg']).default('lbs'),
  })
  .refine(
    ({ product_plu }: { product_plu: number }) => {
      return (
        (product_plu >= 100000 && product_plu <= 999999) ||
        (product_plu >= 1000 && product_plu <= 9999)
      );
    },
    () => ({
      path: ['product_plu'],
      message: '"Product PLU should be a 4 digit or 6 digit numeral.',
    })
  );

export const AddScaleSchema = z.object({
  ss_uid: z.string().nonempty('Scale UID is required'),
  oem_name: z.string().nonempty('Scale OEM is required.'),
  model_name: z.string().nonempty('Product image is required.'),
});

export const ScaleSchema = z
  .object({
    uuid: z
      .string()
      .min(6, 'UUID should be at least 6 characters long.')
      .max(20, 'UUID must not exceed 20 characters.'),
    oem_name: z
      .string()
      .min(6, 'OEM should be at least 6 characters long.')
      .max(20, 'Name must not exceed 20 characters.'),
    model_name: z
      .string()
      .min(6, 'Model should be at least 6 characters long.')
      .max(20, 'Name must not exceed 20 characters.'),
    allocation_weight: z.number().int().positive().default(0),
    threshold_weight: z.number().int().positive().default(0),
    location: z.object({ LocationSchema }).optional(),
    product: z.object({ ProductSchema }).optional(),
  })
  .refine(
    ({ allocation_weight, product }) => {
      if (product) return allocation_weight !== undefined;
      return true;
    },
    () => ({
      path: ['allocation_weight'],
      message:
        '"Allocation weight" is required when adding a product to the scale.',
    })
  )
  .refine(
    ({ threshold_weight, product }) => {
      if (product) return threshold_weight !== undefined;
      return true;
    },
    () => ({
      path: ['threshold_weight'],
      message:
        '"Threshold weight" is required when adding a product to the scale.',
    })
  )
  .refine(
    ({ location, product }) => {
      if (product) return location !== undefined;
      return true;
    },
    () => ({
      path: ['location'],
      message: '"Location" is required when adding a product to the scale.',
    })
  );
