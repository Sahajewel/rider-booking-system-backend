import z from "zod";
import { Role } from "./user.interface";

// auth.validation.ts
export const registerUserZodSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(Object.values(Role)).optional(),
});
export const updateUserZodSchema = z.object({
  password: z.string().min(6).optional(),
  name: z.string().min(1).optional(),
  role: z.enum(Object.values(Role)).optional(),
});
