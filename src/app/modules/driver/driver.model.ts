import { Schema, model } from "mongoose";
import { IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export const Driver = model<IDriver>("Driver", driverSchema);
