import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";


export const validSchemaRequest =
  (zodSchema: ZodObject<ZodRawShape>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.body?.data==="string" ) {
        req.body = JSON.parse(req.body.data);
      }

      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
