import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes";
import { UserService } from "./user.service";
import { IUser, Role } from "./user.interface";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appErrors";


const getUsers = catchAsync(async(req:Request, res: Response)=>{
   const result = await UserService.getUsers(req.user as IUser);
   sendResponse(res,{
    statusCode: statusCode.OK,
    success: true,
    message: "user successfully retrieved",
    data: result,
  
  })
})
const getMe = async(req:Request, res: Response)=>{
  const decodedToken = req.user as JwtPayload
   const result = await UserService.getMe(decodedToken.userId);
   sendResponse(res,{
    statusCode: statusCode.OK,
    success: true,
    message: "your profile successfully retrieved",
    data: result.data,
  
  })
};
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
        success: true,
        statusCode: statusCode.CREATED,
        message: "Single User Retrieved Successfully",
        data: result
    })
});
const updateUser = catchAsync(async(req: Request, res: Response)=>{
  const userId = req.params.id;
//   const token = req.headers.authorization;
//   const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_TOKEN);
  const payload = req.body;
const verifiedToken = req.user
  const update = await UserService.updateUser(userId,payload, verifiedToken as JwtPayload) 
  sendResponse(res,{
    statusCode: statusCode.CREATED,
    success: true,
    message: "user successfully updated",
    data: update

  })

});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
   const userId = req.params.id;
//   const token = req.headers.authorization;
//   const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_TOKEN);

const verifiedToken = req.user
  const result = await UserService.deleteUser(userId, verifiedToken as JwtPayload) 

  // If you want to allow only self-deletion or admin:
 


  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'User deleted successfully',
    data: result
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const admin = req.user as IUser;

  const result = await UserService.blockUser(userId, admin);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const admin = req.user as IUser;

  const result = await UserService.unblockUser(userId, admin);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "User unblocked successfully",
    data: result,
  });
});
const approveDriver = catchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const admin = req.user as IUser;

  const result = await UserService.approveDriver(driverId, admin);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Driver approved successfully",
    data: result,
  });
});

const suspendDriver = catchAsync(async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const admin = req.user as IUser;

  const result = await UserService.suspendDriver(driverId, admin);

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Driver suspended successfully",
    data: result,
  });
});

export const UserController = {
    getUsers,
    getMe,
    getSingleUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    suspendDriver,
    approveDriver
}