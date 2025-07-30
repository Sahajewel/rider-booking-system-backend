// src/modules/driver/driver.validation.ts
import { z } from "zod";

export const createDriverZodSchema = z.object({
 
    name: z.string().nonempty("Name is required"),
    email: z.email("Name is required"),
    password: z.string().nonempty("Name is required"),
    driverInfo: z.object({
      vehicleNumber: z.string().nonempty("car number is required"),
      vehicleType: z.string().nonempty("car type is required"),
    })
  })


export const updateDriverZodSchema = z.object({

    name: z.string().optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
    driverInfo: z
      .object({
        vehicleNumber: z.string().optional(),
        vehicleType: z.string().optional(),
        isApproved: z.boolean().optional(),
        isAvailable: z.boolean().optional(),
        totalEarnings: z.number().optional(),
      })
      .optional(),
  })

