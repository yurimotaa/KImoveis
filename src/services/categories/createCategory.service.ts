import { Repository } from "typeorm";
import { Category } from "../../entities";
import { TCategoryRequest } from "../../interfaces/categories.interfaces";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const createCategoryService = async (
  isAdmin: boolean,
  categoryBody: TCategoryRequest
): Promise<Category> => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepo.create(categoryBody);

  await categoryRepo.save(category);

  return category;
};

export default createCategoryService;
