import express from "express";
import { createDriverZodSchema, updateDriverZodSchema } from "./driver.validation";
import { validSchemaRequest } from "../../middleware/validateRequest";
import { DriverController } from "./driver.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";


const router = express.Router();
// admin er jonno
router.post("/",checkAuth(Role.ADMIN), validSchemaRequest(createDriverZodSchema), DriverController.createDriver);
router.get("/",checkAuth(Role.ADMIN), DriverController.getAllDrivers);
router.get("/:id",checkAuth(Role.ADMIN), DriverController.getSingleDriver);
router.put("/:id",checkAuth(Role.ADMIN), validSchemaRequest(updateDriverZodSchema), DriverController.updateDriver);
router.delete("/:id",checkAuth(Role.ADMIN), DriverController.deleteDriver);
router.patch("/availability",checkAuth(Role.DRIVER), DriverController.updateAvailability);

export const DriverRoutes = router;
