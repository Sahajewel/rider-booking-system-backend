import { z } from "zod";
import { RideStatus } from "./ride.interface";
export const requestRideZodSchema = z.object({
  pickupLocation: z.string().nonempty("pickupLocation required"),
  dropoffLocation: z.string().nonempty("destination required"),
  //  rider: z.string().nonempty("rider is required"),
});





export const updateRideStatusZodSchema = z.object({
  status: z.enum([
    RideStatus.REQUESTED,
    RideStatus.PENDING,
    RideStatus.ACCEPTED,
    RideStatus.REJECTED,
    RideStatus.ONGOING,
    RideStatus.COMPLETED,
    RideStatus.CANCELLED,
  ]),
});
