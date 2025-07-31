import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appErrors";
import { IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcrypt";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../user/user.token";

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
import { Driver } from "../driver/driver.model"; // Import Driver model

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  // Step 1: Check in Driver first, then in User
  const user =
    (await Driver.findOne({ email })) || (await User.findOne({ email }));

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Step 2: Compare password
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    user.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Step 3: Create token
  const userToken = createUserTokens(user);
  const { password: pass, ...rest } = user.toObject();

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