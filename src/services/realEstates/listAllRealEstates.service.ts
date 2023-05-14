import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const listAllRealEstatesService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates: Array<RealEstate> = await realEstateRepo.find({
    relations: ["address"],
  });

  return realEstates;
};

export default listAllRealEstatesService;
