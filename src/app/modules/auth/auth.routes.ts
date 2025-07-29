import { Router } from "express";

import { validSchemaRequest } from "../../middleware/validateRequest";
// import { loginUserZodSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { registerUserZodSchema } from "../user/user.validation";
import { loginUserZodSchema } from "./auth.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();
router.post(
  "/register",
  validSchemaRequest(registerUserZodSchema),
  AuthController.createUser
);
router.post(
  "/login",
  validSchemaRequest(loginUserZodSchema),
  AuthController.credentialLogin
);
router.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  AuthController.changePassword
);
router.post("/logout", AuthController.logout);


export const authRoutes = router;
