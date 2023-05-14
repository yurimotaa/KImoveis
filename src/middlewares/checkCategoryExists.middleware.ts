import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { TCategoryRequest } from "../interfaces/categories.interfaces";

const checkCategoryExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const categoryBody: TCategoryRequest = request.body;

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  if (categoryBody.name) {
    const categoryExists = await categoryRepo.exist({
      where: { name: categoryBody.name },
    });

    if (categoryExists) {
      throw new AppError("Category already exists", 409);
    }
  }

  next();
};

export default checkCategoryExistsMiddleware;
