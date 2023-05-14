import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error";
import "dotenv/config";

const ensureTokenIsValidMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token: string | undefined = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) throw new AppError(error.message, 401);

    response.locals.userId = decoded.sub;
    response.locals.userAdmin = decoded.admin;

    return next();
  });
};

export default ensureTokenIsValidMiddleware;
