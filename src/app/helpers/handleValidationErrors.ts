import mongoose from "mongoose";
import { TerrorSources, TGenericErrorSources } from "../interfaces/errors.types";

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorSources=>{
     
    const errorSources: TerrorSources[] = [];
    const errors = Object.values(err.errors);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.forEach((errorObject: any) => errorSources.push({
        path: errorObject.path,
       message: errorObject.message
}))
      return {
        statusCode : 400,
         message: "Validation Error",
         errorSources
      }
}