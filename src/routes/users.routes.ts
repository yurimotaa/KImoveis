import { Router } from "express";
import checkEmailExistsMiddlewares from "../middlewares/checkEmailExists.middleware";
import {
  createUserController,
  getAllUsersController,
} from "../controllers/user/users.controller";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { requestUserSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  checkBodyValidationMiddleware(requestUserSchema),
  checkEmailExistsMiddlewares,
  createUserController
);

usersRoutes.get("", ensureTokenIsValidMiddleware, getAllUsersController);

export default usersRoutes;
