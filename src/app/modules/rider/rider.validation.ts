import { z } from "zod";

export const createRiderZodSchema = z.object({
 
    name: z.string().nonempty("Name is required"),
     email: z.email("Name is required"),
password: z.string().nonempty("Name is required"),
 
});

export const updateRiderZodSchema = z.object({
 
    name: z.string().optional(),
    email: z.email().optional(),
    password: z.string().optional(),
    isBlocked: z.boolean().optional(),
 
});
