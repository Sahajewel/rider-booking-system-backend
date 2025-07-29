import { z } from "zod";

export const loginUserZodSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
 
});
