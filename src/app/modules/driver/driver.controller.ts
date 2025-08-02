import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { DriverService } from "./driver.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.createDriver(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Driver created successfully",
    data: result,
  });
});

const getAllDrivers = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.getAllDrivers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All drivers data retrieved successfully",
    data: result,
  });
});

const getSingleDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.getSingleDriver(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "single driver data retrieved successfully",
    data: result,
  });
});

const updateDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.updateDriver(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "driver updated successfully",
    data: result,
  });
});

const deleteDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.deleteDriver(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "driver delete successfully",
    data: result,
  });
});

 const updateAvailability = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.user as JwtPayload; // if you are using auth, this should come from token
    const updatedDriver = await DriverService.updateAvailability(email, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
      success: true,
      message: "Driver availability updated successfully",
      data: updatedDriver,
    });
  })
const getEarningsHistory = catchAsync(async (req: Request, res: Response) => {
  // const { email } = req.user as JwtPayload; // Comes from checkAuth
  const result = await DriverService.getEarningsHistory();
    // const result = await RiderService.getMyRides(riderId);

  // const earnings = await DriverService.getEarningsHistory(email);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Earnings history fetched successfully",
    data: result,
  });
});

export const DriverController = {
  createDriver,
  getAllDrivers,
  getSingleDriver,
  updateDriver,
  deleteDriver,
  updateAvailability,
  getEarningsHistory
};
