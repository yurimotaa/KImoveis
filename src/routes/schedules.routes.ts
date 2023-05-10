import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
  createScheduleController,
  getAllSchedulesByEstateIdController,
} from "../controllers/schedules/schedules.controllers";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { scheduleSchemaRequest } from "../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  checkBodyValidationMiddleware(scheduleSchemaRequest),
  createScheduleController
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  getAllSchedulesByEstateIdController
);

export default schedulesRoutes;
