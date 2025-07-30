import express from "express";
import { createDriverZodSchema, updateDriverZodSchema } from "./driver.validation";
import { validSchemaRequest } from "../../middleware/validateRequest";
import { DriverController } from "./driver.controller";


const router = express.Router();

router.post("/", validSchemaRequest(createDriverZodSchema), DriverController.createDriver);
router.get("/", DriverController.getAllDrivers);
router.get("/:id", DriverController.getSingleDriver);
router.put("/:id", validSchemaRequest(updateDriverZodSchema), DriverController.updateDriver);
router.delete("/:id", DriverController.deleteDriver);

export const DriverRoutes = router;
