import AppError from "../../errorHelpers/appErrors";
import { Ride } from "../ride/ride.model";
import httpStatus from "http-status-codes";
import { RideStatus } from "./ride.interface";

const requestRide = async (riderId: string, rideData: any) => {
  if (!rideData.pickupLocation || !rideData.dropoffLocation) {
    throw new AppError(httpStatus.BAD_REQUEST, "Pickup and dropoff required");
  }

  const newRide = await Ride.create({
    rider: riderId,
    pickupLocation: rideData.pickupLocation,
    dropoffLocation: rideData.dropoffLocation,
    status: "pending",
  });

  return newRide;
};

const getMyRides = async (riderId: string) => {
  const rides = await Ride.find({ rider: riderId });
  return rides;
};

const cancelRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findOne({ _id: rideId, rider: riderId });

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.status !== RideStatus.PENDING) {
    throw new AppError(httpStatus.BAD_REQUEST, "Only pending rides can be cancelled");
  }

 ride.status = RideStatus.CANCELLED;
  await ride.save();

  return ride;
};

const getSingleRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findOne({ _id: rideId, rider: riderId });

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  return ride;
};

export const RiderService = {
  requestRide,
  getMyRides,
  cancelRide,
  getSingleRide,
};
