import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appErrors";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import statusCode from "http-status-codes";
import { IDriver } from "../driver/driver.interface";
import { Driver } from "../driver/driver.model";


const getUsers = async (user: IUser) => {

  if(user.role !== Role.ADMIN){
    throw new AppError(401, "Unauthorized access")
  }
    const users = await User.find();
  return {
    data: users,
  };
};
const getMe = async (userId: string) => {
  const users = await User.findById(userId).select("-password");
 
  return {
    data: users,

  };
};
const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");
    return {
        data: user
    }
};
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if(decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER){
    if(userId !==decodedToken.userId){
      throw new AppError(401, "You are not authorized")
    }
  }
  
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(statusCode.NOT_FOUND, "User not found");
  }
  if (payload.role) {
    if (
      decodedToken.role === Role.DRIVER ||
      decodedToken.role === Role.RIDER
    ) {
      throw new AppError(statusCode.FORBIDDEN, "You are not authorized");
    }

  }
 
  
  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdateUser;
};

const blockUser = async (userId: string, admin: IUser) => {
  if (admin.role !== Role.ADMIN) {
    throw new AppError(403, "Forbidden access");
  }

  const user = await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

const unblockUser = async (userId: string, admin: IUser) => {
  if (admin.role !== Role.ADMIN) {
    throw new AppError(403, "Forbidden access");
  }

  const user = await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};
const approveDriver = async (id: string, admin: IUser) => {
  if (admin.role !== Role.ADMIN) {
    throw new AppError(403, "Forbidden access");
  }
 const user = await User.findById(id);
 if(!user){
   throw new AppError(404, "User not found");
 }
 if(user.role !== Role.DRIVER){
  throw new AppError(400, "Only drivers can be approved");
 }
user.driverStatus = "approved";
 
await user.save();

  return user;
};

const suspendDriver = async (id: string, admin: IUser) => {
  if (admin.role !== Role.ADMIN) {
    throw new AppError(403, "Forbidden access");
  }
const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "Driver not found");
  };
  if(user.role !=Role.DRIVER){
    throw new AppError(400, "Only drivers can be suspended");
  };
  user.driverStatus = "suspended"
  await user.save()



  return user;
};

const deleteUser = async (id: string, user: any) => {
      if(user.role !== Role.ADMIN){
    throw new AppError(401, "Unauthorized access")
  }
  return await User.findByIdAndDelete(id);
};
export const UserService = {
    getUsers,
    getMe,
    getSingleUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    suspendDriver,
    approveDriver
}