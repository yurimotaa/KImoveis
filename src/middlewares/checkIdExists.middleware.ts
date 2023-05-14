import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const checkIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = parseInt(request.params.id);

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const idExists = await userRepo.exist({
    where: { id: userId },
  });

  if (!idExists) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default checkIdExistsMiddleware;
