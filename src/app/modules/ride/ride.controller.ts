import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { RiderService } from "./ride.service";

const requestRide = catchAsync(async (req: Request, res: Response) => {
  const riderId = req.user?._id;
  const rideData = req.body;

  const result = await RiderService.requestRide(riderId, rideData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Ride requested successfully!",
    data: result,
  });
});

const getMyRides = catchAsync(async (req: Request, res: Response) => {
  const riderId = req.user?._id;
  const result = await RiderService.getMyRides(riderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rides retrieved successfully!",
    data: result,
  });
});

const cancelRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const riderId = req.user?._id;

  const result = await RiderService.cancelRide(rideId, riderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride cancelled successfully!",
    data: result,
  });
});

const getSingleRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const riderId = req.user?._id;

  const result = await RiderService.getSingleRide(rideId, riderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride details retrieved!",
    data: result,
  });
});
const acceptRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = req.user?._id;

  const result = await RiderService.acceptRide(rideId, driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride accepted successfully",
    data: result,
  });
});

const rejectRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = req.user?._id;

  const result = await RiderService.rejectRide(rideId, driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride rejected successfully",
    data: result,
  });
});
const updateRideStatusController = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const { status } = req.body;  // ফ্রন্টএন্ড থেকে নতুন স্ট্যাটাস নিবে

  const updatedRide = await RiderService.updateRideStatus(rideId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride status updated successfully",
    data: updatedRide,
  });
});

export const RiderController = {
  requestRide,
  getMyRides,
  cancelRide,
  getSingleRide,
  acceptRide,
  rejectRide,
  updateRideStatusController
};
