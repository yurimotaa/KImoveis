import { Router } from "express";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { realEstateSchemaRequest } from "../schemas/realEstates.schemas";
import {
  createRealEstateController,
  listAllRealEstatesController,
} from "../controllers/realEstates/realEstate.controller";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  checkBodyValidationMiddleware(realEstateSchemaRequest),
  createRealEstateController
);

realEstateRoutes.get("", listAllRealEstatesController);
export default realEstateRoutes;
