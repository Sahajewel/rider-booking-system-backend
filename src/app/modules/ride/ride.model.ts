import { Schema, model } from "mongoose";
import { IRide, RideStatus } from "./ride.interface";

const rideSchema = new Schema<IRide>({
  // rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "User" },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  status: { type: String, enum: Object.values(RideStatus), default: RideStatus.REQUESTED },
  fare: { type: Number },

  requestedAt: { type: Date, default: Date.now },
  pickUpAt: { type: Date },       
  inTransitAt: { type: Date },   
  completedAt: { type: Date }
});

export const Ride = model<IRide>("Ride", rideSchema);
