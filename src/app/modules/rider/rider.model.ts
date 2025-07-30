import mongoose, { Schema } from "mongoose";
import { IRider } from "./rider.interface";
import { Role } from "../user/user.interface";

const RiderSchema = new Schema<IRider>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [Role.RIDER], default: Role.RIDER },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

export const Rider = mongoose.model<IRider>("Rider", RiderSchema);
