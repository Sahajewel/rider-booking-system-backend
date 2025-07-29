import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appErrors";
import { IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcrypt";
import httpStatus from "http-status-codes";
import { createTokens } from "../user/user.token";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  let { email, password, name, role = Role.RIDER } = payload;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new AppError(401, "User already exists with the email");
  }
  const hashPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.PASSWORD_SALT)
  );
  const createUser = await User.create({
    email,
    password: hashPassword,
    name,
    role,
  });
  return createUser;
};
const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  // Step 1: Check if user exists
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }
  // Step 2: Check password
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }
  const userToken = createTokens(isUserExist);
  const { password: pass, ...rest } = isUserExist.toObject();
  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};
const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match");
  }

  user.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.PASSWORD_SALT)
  );
  user.save();
};
export const AuthService = {
  createUser,
  credentialLogin,
  changePassword,
};
