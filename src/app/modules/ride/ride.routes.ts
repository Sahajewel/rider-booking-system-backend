import express from "express";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middleware/checkAuth";
import { RiderController } from "./ride.controller";
import { validSchemaRequest } from "../../middleware/validateRequest";
import { requestRideZodSchema, updateRideStatusZodSchema } from "./ride.validation";

const router = express.Router();

router.post(
  "/request",
  validSchemaRequest(requestRideZodSchema),
  checkAuth(Role.RIDER),
  RiderController.requestRide
);

router.get(
  "/my-rides",
  checkAuth(Role.RIDER),
  RiderController.getMyRides
);

router.get(
  "/:id",
  checkAuth(Role.RIDER),
  RiderController.getSingleRide
);

router.patch(
  "/cancel/:id",
  checkAuth(Role.RIDER),
  RiderController.cancelRide
);
router.patch(
  "/accept/:id",
  checkAuth(Role.DRIVER),
  RiderController.acceptRide
);

router.patch(
  "/reject/:id",
  checkAuth(Role.DRIVER),
  RiderController.rejectRide
);
router.patch(
  "/:id/status",
  checkAuth(Role.DRIVER),
  validSchemaRequest(updateRideStatusZodSchema), 
  RiderController.updateRideStatusController
);
export const RideRoutes = router;
