import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { requestCategorySchema } from "../schemas/categories.schemas";
import checkCategoryExistsMiddleware from "../middlewares/checkCategoryExists.middleware";
import {
  createCategoryController,
  getAllCategoriesController,
  listAllPropertiesInTheCategoryController,
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

categoriesRoutes.get(
  "/:id/realEstate",
  listAllPropertiesInTheCategoryController
);

export default categoriesRoutes;
