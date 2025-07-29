/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TGenericErrorSources } from "../interfaces/errors.types";


export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorSources => {
  return { statusCode: 400, message: "Invalid object id" };
};