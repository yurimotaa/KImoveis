import { Router } from "express";
import checkEmailExistsMiddlewares from "../middlewares/checkEmailExists.middleware";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from "../controllers/user/users.controller";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import {
  requestUserSchema,
  updateUserRequestSchema,
} from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import checkIdExistsMiddleware from "../middlewares/checkIdExists.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  checkBodyValidationMiddleware(requestUserSchema),
  checkEmailExistsMiddlewares,
  createUserController
);

usersRoutes.get("", ensureTokenIsValidMiddleware, getAllUsersController);

usersRoutes.patch(
  "/:id",
  checkIdExistsMiddleware,
  checkBodyValidationMiddleware(updateUserRequestSchema),
  ensureTokenIsValidMiddleware,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  checkIdExistsMiddleware,
  ensureTokenIsValidMiddleware,
  deleteUserController
);

export default usersRoutes;
