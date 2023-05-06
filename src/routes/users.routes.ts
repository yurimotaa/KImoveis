import { Router } from "express";
import checkEmailExistsMiddlewares from "../middlewares/checkEmailExists.middleware";
import { createUserController } from "../controllers/createUser.controller";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { requestUserSchema } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  checkBodyValidationMiddleware(requestUserSchema),
  checkEmailExistsMiddlewares,
  createUserController
);

export default usersRoutes;
