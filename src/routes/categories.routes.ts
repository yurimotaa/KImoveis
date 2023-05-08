import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { requestCategorySchema } from "../schemas/categories.schemas";
import checkCategoryExistsMiddleware from "../middlewares/checkCategoryExists.middleware";
import {
  createCategoryController,
  getAllCategoriesController,
} from "../controllers/categories/categories.controller";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  checkBodyValidationMiddleware(requestCategorySchema),
  checkCategoryExistsMiddleware,
  ensureTokenIsValidMiddleware,
  createCategoryController
);

categoriesRoutes.get("", getAllCategoriesController);

export default categoriesRoutes;
