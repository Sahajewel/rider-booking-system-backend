import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { User } from "./user.model";
import AppError from "../../errorHelpers/appErrors";



export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN, envVars.EXPIRESIN)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN, envVars.REFRESH_EXPIRESIN)


    return {
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_TOKEN) as JwtPayload


    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }
  
   

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN, envVars.EXPIRESIN)

    return accessToken
}