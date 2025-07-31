import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import AppError from "../errorHelpers/appErrors";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { User } from "../modules/user/user.model";
export const checkAuth = (...authRoles: string[])=>async(req:Request, res: Response, next: NextFunction)=>{
  
   try{
     const accessToken = req.headers.authorization;
    if(!accessToken){
        throw new AppError(httpStatus.BAD_REQUEST, "Token not valid")
    }
    const verifiedToken  = verifyToken(accessToken,envVars.JWT_ACCESS_TOKEN) as JwtPayload;
      const isUserExist = await User.findOne({ email: verifiedToken.email});
    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    };
    
    
    if (isUserExist.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, "You are blocked. Contact admin.");
      }
 
    if(authRoles.length && !authRoles.includes(verifiedToken.role)){
        throw new AppError(httpStatus.BAD_REQUEST, "You are not verified")
    }
    console.log("verifiedToken", verifiedToken)
    req.user = verifiedToken;
    next()
   }catch(err){
    console.log("object")
    next(err)
   }
}