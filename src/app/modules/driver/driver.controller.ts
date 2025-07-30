import { catchAsync } from './../../utils/catchAsync';
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { DriverService } from './driver.service';


 const  createDriver = catchAsync(async (req: Request, res: Response) => {
    const result = await DriverService.createDriver(req.body);
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "driver successfully created",
    data: result,
  });
  },)
 
 const getAllDrivers = catchAsync(async (req: Request, res: Response) => {
    const result = await DriverService.getAllDrivers();
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "driver successfully retrieved",
    data: result,
  });
  })

  const getSingleDriver = catchAsync(async (req: Request, res: Response) => {
    const result = await DriverService.getSingleDriver(req.params.id);
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "single driver successfully retrieved",
    data: result,
  });
  })

 const  updateDriver = catchAsync(async (req: Request, res: Response) => {
    const result = await DriverService.updateDriver(req.params.id, req.body);
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "driver successfully updated",
    data: result,
  });
  })

 const  deleteDriver = catchAsync(async (req: Request, res: Response) => {
    const result = await DriverService.deleteDriver(req.params.id);
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "driver successfully updated",
    data: result,
  });
  })


export const DriverController = {
createDriver,
getAllDrivers,
getSingleDriver,
updateDriver,
deleteDriver
}
