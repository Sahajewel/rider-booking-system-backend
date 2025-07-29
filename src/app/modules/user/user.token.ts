import httpStatus from "http-status-codes"
import { StringValue } from "ms";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appErrors";


export const createTokens = (user: Partial<IUser>)=>{
     const token = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(token,envVars.JWT_ACCESS_TOKEN, {expiresIn :envVars.EXPIRESIN as StringValue})
    const refreshToken = generateToken(token, envVars.JWT_REFRESH_TOKEN, {expiresIn:envVars.REFRESH_EXPIRESIN as StringValue});
    return {
        accessToken,
        refreshToken
    }
};
export const createNewAccessTokenWithRefreshToken = async(refreshToken: string)=>{
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_TOKEN) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email});
    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    };
   const token = {
          userId: isUserExist._id,
          email: isUserExist.email,
          role: isUserExist.role
      }
      const accessToken = generateToken(token,envVars.JWT_ACCESS_TOKEN, {expiresIn :envVars.EXPIRESIN as StringValue});
      return accessToken;

}