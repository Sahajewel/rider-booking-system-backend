
import { Driver } from "./driver.model";
import { IDriver } from "./driver.interface";
import bcryptjs from "bcrypt"
import { envVars } from "../../config/env";
import { IUser, Role } from "../user/user.interface";
import AppError from "../../errorHelpers/appErrors";
import { User } from "../user/user.model";


 const createDriver = async (payload: IDriver) => {
  // if(payload.role !==Role.DRIVER){
  //   throw new AppError(401, "You are not created driver because your role is not driver")
  // }
  const hashedPassword = await bcryptjs.hash(payload.password, Number(envVars.PASSWORD_SALT));
  const driverData = {
    ...payload,
    password: hashedPassword,
    role: "driver",
  };
  return await Driver.create(driverData);
};
  

 const getAllDrivers = async () => {
  return await Driver.find();
};


const getSingleDriver = async (id: string) => {
  return await Driver.findById(id);
};


const updateDriver = async (id: string, payload: Partial<IDriver>) => {
  if (payload.password) {
    payload.password = await bcryptjs.hash(payload.password, envVars.PASSWORD_SALT);
  }
  return await Driver.findByIdAndUpdate(id, payload, { new: true });
};

const deleteDriver = async (id: string) => {
  return await Driver.findByIdAndDelete(id);
};

const   updateAvailability = async (email: string, payload: { isAvailable: boolean }) => {
    const updated = await Driver.findOneAndUpdate(
      { email },
      { "driverInfo.isAvailable": payload.isAvailable },
      { new: true }
    );
    return updated;
  }
  const getEarningsHistory = async (email: string) => {
    // if(email === User.email ){
      
    // }
  const driver = await Driver.findOne({ email });

  if (!driver) {
    throw new Error("Driver not found");
  }

  return {
    totalEarnings: driver.driverInfo.totalEarnings,
    driverId: driver._id,
    name: driver.name,
    vehicleType: driver.driverInfo.vehicleType,
  };
};


 export const DriverService = {
    createDriver,
    getAllDrivers,
    getSingleDriver,
    updateDriver,
    deleteDriver,
    updateAvailability,
    getEarningsHistory
}