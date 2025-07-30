import { Types } from "mongoose";
import { Role } from "../user/user.interface";

export interface IRider {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role.RIDER;
  isBlocked?: boolean;  // ইউজার ব্লক করা আছে কিনা চেক করার জন্য
  createdAt?: Date;
  updatedAt?: Date;
}
