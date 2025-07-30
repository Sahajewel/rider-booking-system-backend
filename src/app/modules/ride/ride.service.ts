import AppError from "../../errorHelpers/appErrors";
import { Ride } from "../ride/ride.model";
import httpStatus from "http-status-codes";
import { RideStatus } from "./ride.interface";
import { Types } from "mongoose";

const requestRide = async (riderId: string, rideData: any) => {
  if (!rideData.pickupLocation || !rideData.dropoffLocation) {
    throw new AppError(httpStatus.BAD_REQUEST, "Pickup and dropoff required");
  }

  const newRide = await Ride.create({
    rider: riderId,
    pickupLocation: rideData.pickupLocation,
    dropoffLocation: rideData.dropoffLocation,
    status: RideStatus.REQUESTED,  // এখানে PENDING এর পরিবর্তে REQUESTED
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

  if (ride.status !== RideStatus.REQUESTED) {  // PENDING থেকে REQUESTED
    throw new AppError(httpStatus.BAD_REQUEST, "Only requested rides can be cancelled");
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

const acceptRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, "Ride not found");

  if (ride.status !== RideStatus.REQUESTED) {  // PENDING থেকে REQUESTED
    throw new AppError(httpStatus.BAD_REQUEST, "Only requested rides can be accepted");
  }

  ride.status = RideStatus.ACCEPTED;
  ride.driver = new Types.ObjectId(driverId);  // ObjectId convert ঠিক আছে
  await ride.save();

  return ride;
};

const rejectRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, "Ride not found");

  if (ride.status !== RideStatus.REQUESTED) {  // PENDING থেকে REQUESTED
    throw new AppError(httpStatus.BAD_REQUEST, "Only requested rides can be rejected");
  }

  ride.status = RideStatus.REJECTED;
  ride.driver = new Types.ObjectId(driverId);  // ObjectId convert ঠিক আছে
  await ride.save();

  return ride;
};
const updateRideStatus = async (rideId: string, status: RideStatus) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, "Ride not found");

  ride.status = status;

  if (status === RideStatus.ACCEPTED) {
    ride.pickUpAt = new Date();
  } else if (status === RideStatus.ONGOING) {
    ride.inTransitAt = new Date();
  } else if (status === RideStatus.COMPLETED) {
    ride.completedAt = new Date();
  }

  await ride.save();

  return ride;
};
export const RiderService = {
  requestRide,
  getMyRides,
  cancelRide,
  getSingleRide,
  acceptRide,
  rejectRide,
  updateRideStatus
};
