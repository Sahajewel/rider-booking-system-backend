// src/modules/driver/driver.interface.ts
import {  Types } from "mongoose";
import { Role } from "../user/user.interface";

export interface IDriverVehicleInfo {
  vehicleNumber: string;
  vehicleType: string;
  isApproved: boolean;
  isAvailable: boolean;
  totalEarnings: number;
}

export interface IDriver  {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role.DRIVER;
  driverInfo: IDriverVehicleInfo;
}
