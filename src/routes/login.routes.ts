import { Router } from "express";
import { realizeLoginController } from "../controllers/login/realizeLogin.controller";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import { requestLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  checkBodyValidationMiddleware(requestLoginSchema),
  realizeLoginController
);

export default loginRoutes;
