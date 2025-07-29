import { Schema, model, Document } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.RIDER,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false
});

export const User = model<IUser>("User", userSchema);
