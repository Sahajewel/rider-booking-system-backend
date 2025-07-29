/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { TerrorSources } from "../interfaces/errors.types";
import AppError from "../errorHelpers/appErrors";
import { handleDuplicateError } from "../helpers/handleDuplicateErrors";
import { handleCastError } from "../helpers/handleCastErrors";
import { handleZodError } from "../helpers/handleZodErrors";
import { handleValidationError } from "../helpers/handleValidationErrors";

// import { deleteImageFromCloudinary } from "../config/cloudinary.config";

/* eslint-disable @typescript-eslint/no-explicit-any */
// export const globalErroHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "something went wrong",
//     stack: envVars.NODE_ENV === "development" ? err.stack : null,
//   });
// };





export const globalErroHandler = async(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
    if (envVars.NODE_ENV === "development"){
        console.log(err)
    }
    let errorSources: TerrorSources[] = [];
  let statusCode = 500;
  let message = "something went wrong";
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  // duplicate error
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    //    object id error
  } else if (err.name === "CastError") {
    const handleCast = handleCastError(err)
    statusCode = handleCast.statusCode;
    message = handleCast.message;
  }
  // zod error
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TerrorSources[];
    message = simplifiedError.message
  }
  // mongoose error
  else if (err.name === "ValidationError") {
   const simplifiedError = handleValidationError(err);
   statusCode = simplifiedError.statusCode
  errorSources = simplifiedError.errorSources as TerrorSources[]
   message= simplifiedError.message
  
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
