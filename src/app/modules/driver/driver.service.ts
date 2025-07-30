
import { Driver } from "./driver.model";
import { IDriver } from "./driver.interface";

 const createDriver =  async (payload: IDriver) => {
    return await Driver.create(payload);
  }
  

 const  getAllDrivers = async () => {
    return await Driver.find();
  }

 const  getSingleDriver = async (id: string) => {
    return await Driver.findById(id);
  }

  const updateDriver = async (id: string, payload: Partial<IDriver>) => {
    return await Driver.findByIdAndUpdate(id, payload, { new: true });
  }

  const deleteDriver = async (id: string) => {
    return await Driver.findByIdAndDelete(id);
  }

 export const DriverService = {
    createDriver,
    getAllDrivers,
    getSingleDriver,
    updateDriver,
    deleteDriver
}