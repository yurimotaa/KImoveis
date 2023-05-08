import { Category, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const listAllPropertiesInTheCategoryService = async (
  categoryId: number
): Promise<{ id: number; name: string; realEstate: RealEstate[] }> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: ["realEstates"],
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return {
    id: category.id,
    name: category.name,
    realEstate: category.realEstates,
  };
};

export default listAllPropertiesInTheCategoryService;
