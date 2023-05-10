import { Repository } from "typeorm";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import {
  TAddress,
  TRealEstateRequest,
} from "../../interfaces/realEstate.interfaces";
import { AppDataSource } from "../../data-source";

const createRealEstateService = async (
  payload: TRealEstateRequest,
  isAdmin: boolean
): Promise<RealEstate> => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  // Buscando id do endereço
  const addressData: TAddress = payload.address;

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const addressFind = await addressRepo.findOne({
    where: {
      street: addressData.street,
      zipCode: addressData.zipCode,
      city: addressData.city,
      state: addressData.state,
    },
  });

  if (addressFind) {
    throw new AppError("Address already exists", 409);
  }

  // Criando e salvando o endereço
  const address: Address = addressRepo.create(addressData);

  await addressRepo.save(address);

  // Buscando id da categoria
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryFind = await categoryRepo.findOne({
    where: {
      id: payload.categoryId,
    },
  });

  if (!categoryFind) {
    throw new AppError("Category not found", 409);
  }

  // Criando o imovel
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const newRealEstate = realEstateRepo.create({
    value: payload.value,
    size: payload.size,
    address: address,
    category: categoryFind,
    sold: false,
  });

  await realEstateRepo.save(newRealEstate);

  return newRealEstate;
};

export default createRealEstateService;
