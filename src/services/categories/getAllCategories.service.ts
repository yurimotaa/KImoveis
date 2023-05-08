import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const getAllCategoriesService = async (): Promise<Category[]> => {
  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const users: Array<Category> = await categoriesRepo.find();

  return users;
};

export default getAllCategoriesService;
