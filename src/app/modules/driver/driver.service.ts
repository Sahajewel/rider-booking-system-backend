
import { Driver } from "./driver.model";
import { IDriver } from "./driver.interface";
import bcryptjs from "bcrypt"
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appErrors";



const createDriver = async (payload: IDriver) => {
  // Optional: Check role if needed
  // if (payload.role !== Role.DRIVER) {
  //   throw new AppError(401, "You are not allowed to create a driver because your role is not DRIVER");
  // }

  // Validate required nested fields
  if (!payload.driverInfo?.licenseNumber) {
    throw new AppError(400, "License number is required");
  }

  // Hash the password
  const hashedPassword = await bcryptjs.hash(payload.password, Number(envVars.PASSWORD_SALT));

  const driverData = {
    ...payload,
    password: hashedPassword,
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
  const getEarningsHistory = async () => {
    
  return await Driver.find().select("totalEarnings"); 

  
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