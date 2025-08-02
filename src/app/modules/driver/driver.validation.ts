// src/modules/driver/driver.validation.ts
import { z } from "zod";

export const createDriverZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Email is invalid"),
  password: z.string().nonempty("Password is required"),
  driverInfo: z.object({
    vehicleNumber: z.string().nonempty("Vehicle number is required"),
    vehicleType: z.string().nonempty("Vehicle type is required"),
    licenseNumber: z.string().nonempty("License number is required"),
    isApproved: z.boolean().default(false),
    isAvailable: z.boolean().default(true),
  }),
});

export const updateDriverZodSchema = z.object({
  name: z.string().optional(),
  email: z.email("Invalid email").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  totalEarnings: z.number().optional(),
  isVerified: z.boolean().optional(),
  driverInfo: z
    .object({
      vehicleNumber: z.string().optional(),
      vehicleType: z.string().optional(),
      licenseNumber: z.string().optional(),
      isApproved: z.boolean().optional(),
      isAvailable: z.boolean().optional(),
    })
    .optional(),
});
