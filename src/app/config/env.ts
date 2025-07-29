import dotenv from "dotenv";
dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  NODE_ENV: "development" | "production";
  PASSWORD_SALT: string;
   JWT_ACCESS_TOKEN: string;
  JWT_REFRESH_TOKEN: string;
  EXPIRESIN: string;
  REFRESH_EXPIRESIN: string;
  
}

const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVariable: string[] = [
    "PORT",
    "DB_USER",
    "DB_PASSWORD",
    "NODE_ENV",
    "PASSWORD_SALT",
     "JWT_ACCESS_TOKEN",
    "JWT_REFRESH_TOKEN",
    "EXPIRESIN",
    "REFRESH_EXPIRESIN",
  
  ];
  requiredEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require envuronment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    PASSWORD_SALT: process.env.PASSWORD_SALT as string,
     JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN as string,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN as string,
    EXPIRESIN: process.env.EXPIRESIN as string,
    REFRESH_EXPIRESIN: process.env.REFRESH_EXPIRESIN as string,
  }
};
export const envVars = loadEnvVariable();
