import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
const createUser = catchAsync(async(req: Request, res: Response)=>{
    const result = await AuthService.createUser(req.body);
     sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created  successfully",
    data: result,
  });
});



const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;

  const result = await AuthService.credentialLogin(loginData);

  // You can optionally set refresh token in HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});



export const AuthController = {
    createUser,
    credentialLogin
}