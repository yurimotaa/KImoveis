import { Repository } from "typeorm";
import { RealEstate, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const getAllSchedulesByEstateIdService = async (
  isAdmin: boolean,
  realEstateId: number
): Promise<any> => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepo.findOne({
    where: { id: realEstateId },
    relations: ["schedules", "address", "category"],
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const schedules = await schedulesRepo.find({
    where: { realEstate: { id: realEstate.id } },
    relations: ["user"],
  });

  return {
    address: realEstate.address,
    category: realEstate.category,
    createdAt: realEstate.createdAt,
    id: realEstate.id,
    schedules: schedules,
    size: realEstate.size,
    sold: realEstate.sold,
    updatedAt: realEstate.updatedAt,
    value: realEstate.value,
  };
};

export default getAllSchedulesByEstateIdService;
