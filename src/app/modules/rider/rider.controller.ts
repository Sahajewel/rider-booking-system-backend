import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RiderService } from "./rider.service";

const createRider = catchAsync(async (req: Request, res: Response) => {
  const result = await RiderService.createRider(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Rider created successfully",
    data: result,
  });
});

const getAllRiders = catchAsync(async (req: Request, res: Response) => {
  const result = await RiderService.getAllRiders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Riders retrieved successfully",
    data: result,
  });
});

const getSingleRider = catchAsync(async (req: Request, res: Response) => {
  const result = await RiderService.getSingleRider(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "single rider retrieved successfully",
    data: result,
  });
});

const updateRider = catchAsync(async (req: Request, res: Response) => {
  const result = await RiderService.updateRider(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rider successfully updated",
    data: result,
  });
});

const deleteRider = catchAsync(async (req: Request, res: Response) => {
  const result = await RiderService.deleteRider(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rider successfully deleted",
    data: result,
  });
});



export const RiderController = {
  createRider,
  getAllRiders,
  getSingleRider,
  updateRider,
  deleteRider,

};
