import z from "zod";
import { Role } from "./user.interface";

// auth.validation.ts
export const registerUserZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(Object.values(Role)).optional(),
});
