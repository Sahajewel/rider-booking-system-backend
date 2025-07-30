import bcryptjs from "bcrypt";
import { Rider } from "./rider.model";
import { IRider } from "./rider.interface";
import { envVars } from "../../config/env";

const createRider = async (payload: IRider) => {
  const hashedPassword = await bcryptjs.hash(payload.password, Number(envVars.PASSWORD_SALT));
  const riderData = {
    ...payload,
    password: hashedPassword,
    role: "RIDER",
  };
  return await Rider.create(riderData);
};

const getAllRiders = async () => {
  return await Rider.find();
};

const getSingleRider = async (id: string) => {
  return await Rider.findById(id);
};

const updateRider = async (id: string, payload: Partial<IRider>) => {
  if (payload.password) {
    payload.password = await bcryptjs.hash(payload.password, 10);
  }
  return await Rider.findByIdAndUpdate(id, payload, { new: true });
};

const deleteRider = async (id: string) => {
  return await Rider.findByIdAndDelete(id);
};
const getMyRides = async (riderId: string) => {
  const rides = await Ride.find({ rider: riderId });
  return rides;
};

export const RiderService = {
  createRider,
  getAllRiders,
  getSingleRider,
  updateRider,
  deleteRider,
  getMyRides
};
