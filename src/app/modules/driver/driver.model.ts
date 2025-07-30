// src/modules/driver/driver.model.ts
import mongoose, { Schema } from "mongoose";
import { IDriver } from "./driver.interface";
import { Role } from "../user/user.interface";

const DriverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 role: {
  type: String,
  enum: Object.values(Role), // ["ADMIN", "RIDER", "DRIVER"]
  default: Role.DRIVER,
  uppercase: true, // এটা দিলে ছোট হাতের দিলেও uppercase বানায় নিবে
},
  driverInfo: {
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    totalEarnings: { type: Number, default: 0 },
  },
}, { timestamps: true });

export const Driver = mongoose.model<IDriver>("Driver", DriverSchema);
