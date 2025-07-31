import { Types } from "mongoose";
import { Role } from "../user/user.interface";

export interface IRider {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role.RIDER;
  isBlocked?: boolean;  
  createdAt?: Date;
  updatedAt?: Date;
}
