
import { Driver } from "./driver.model";
import { IDriver } from "./driver.interface";
import bcryptjs from "bcrypt"
import { envVars } from "../../config/env";
 const createDriver = async (payload: IDriver) => {
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

 // নির্দিষ্ট একটি ড্রাইভার বের করার ফাংশন
const getSingleDriver = async (id: string) => {
  return await Driver.findById(id);
};

// ড্রাইভার আপডেট করার ফাংশন
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