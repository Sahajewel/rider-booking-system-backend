import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { UserController } from "./user.controller";
import { validSchemaRequest } from "../../middleware/validateRequest";
import { updateUserZodSchema } from "./user.validation";

const router = Router();
router.get(
  "/",
checkAuth(Role.ADMIN),
  UserController.getUsers
);

router.get(
  "/me",
checkAuth(...Object.values(Role)),
  UserController.getMe
);
router.get("/:id", checkAuth(Role.ADMIN), UserController.getSingleUser);
router.put(
  "/:id",
  validSchemaRequest(updateUserZodSchema),
checkAuth(...Object.values(Role)),
  UserController.updateUser
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  UserController.deleteUser
);

router.patch(
  "/block/:id",
  checkAuth(Role.ADMIN),
  UserController.blockUser
);

router.patch(
  "/unblock/:id",
  checkAuth(Role.ADMIN),
  UserController.unblockUser
);
router.patch(
  "/approve-driver/:id",
  checkAuth(Role.ADMIN),
  UserController.approveDriver
);

router.patch(
  "/suspend-driver/:id",
  checkAuth(Role.ADMIN),
  UserController.suspendDriver
);


export const userRoutes = router;
