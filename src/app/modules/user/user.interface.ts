import { Types } from "mongoose";

export enum Role {
    
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER",
}
export interface IUser {
  _id?: Types.ObjectId;
    email: string;
  password: string;
  name: string;
  role: Role;
}