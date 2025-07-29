import { TGenericErrorSources } from "../interfaces/errors.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDuplicateError = (err: any): TGenericErrorSources => {
  const duplicate = err.message.match(/"([^"]*)"/);
  const value = duplicate?. [1] || "Field"
  return {
    statusCode: 401,
    message: `${value} already exist`,
  };
};