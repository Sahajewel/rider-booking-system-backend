import express from "express";
import { RiderController } from "./rider.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validSchemaRequest } from "../../middleware/validateRequest";
import { createRiderZodSchema, updateRiderZodSchema } from "./rider.validation";
import { Role } from "../user/user.interface";

const router = express.Router();


router.post(
  "/",
  checkAuth(Role.ADMIN),
  validSchemaRequest(createRiderZodSchema),
  RiderController.createRider
);

router.get("/", checkAuth(Role.ADMIN), RiderController.getAllRiders);
router.get("/:id", checkAuth(Role.ADMIN), RiderController.getSingleRider);
router.put(
  "/:id",
  checkAuth(Role.ADMIN),
  validSchemaRequest(updateRiderZodSchema),
  RiderController.updateRider
);
router.get(
  "/my-rides",
  checkAuth(Role.RIDER),
  RiderController.getMyRides
);

router.delete("/:id", checkAuth(Role.ADMIN), RiderController.deleteRider);

export const RiderRoutes = router;
