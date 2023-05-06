import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const checkEmailExistsMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userBody: TUserRequest = request.body;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  if (userBody.email) {
    const emailExists = await userRepo.exist({
      where: { email: userBody.email },
    });

    if (emailExists) {
      throw new AppError("Email already exists", 409);
    }
  }

  next();
};

export default checkEmailExistsMiddlewares;
