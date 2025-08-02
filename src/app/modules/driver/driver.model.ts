import { Schema, model } from "mongoose";
import { IDriver } from "./driver.interface";
import { Role } from "../user/user.interface";

const driverVehicleInfoSchema = new Schema(
  {
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    isApproved: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false } // prevent separate _id for nested object
);

const driverSchema = new Schema<IDriver>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [Role.DRIVER],
      default: Role.DRIVER,
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    driverInfo: {
      type: driverVehicleInfoSchema,
      required: true,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Driver = model<IDriver>("Driver", driverSchema);
