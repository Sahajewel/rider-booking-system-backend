import { z } from "zod";

export const requestRideZodSchema = z.object({
  pickupLocation: z.string().nonempty("pickupLocation required"),
  dropoffLocation: z.string().nonempty("destination required"),
});
