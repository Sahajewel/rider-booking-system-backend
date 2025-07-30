import { Types } from "mongoose";

export enum RideStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  PENDING = "pending"
}


export interface IRide {
  _id?: Types.ObjectId;
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickupLocation: string;
  dropoffLocation: string;
  status: RideStatus;
  fare?: number;
  requestedAt: Date;
  completedAt?: Date;
}