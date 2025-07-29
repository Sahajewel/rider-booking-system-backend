import { Router } from "express";


import { validSchemaRequest } from "../../middleware/validateRequest";
// import { loginUserZodSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { registerUserZodSchema } from "../user/user.validation";
import { loginUserZodSchema } from "./auth.validation";

const router = Router();
router.post(
  "/register",
  validSchemaRequest(registerUserZodSchema),
  AuthController.createUser
);
router.post("/login",validSchemaRequest(loginUserZodSchema), AuthController.credentialLogin);

export const authRoutes = router;