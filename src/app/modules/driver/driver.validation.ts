import { z } from "zod";

export const createDriverZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().nonempty("Phone is required"),
  licenseNumber: z.string().nonempty("License Number is required"),
  isActive: z.boolean().optional(),
});

export const updateDriverZodSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  licenseNumber: z.string().optional(),
  isActive: z.boolean().optional(),
});
