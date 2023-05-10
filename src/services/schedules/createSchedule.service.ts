import { Repository } from "typeorm";
import { TScheduleRequest } from "../../interfaces/schedules.interfaces";
import { RealEstate, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const createScheduleService = async (
  tokenId: number,
  payload: TScheduleRequest
): Promise<any> => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);

  // Verifica se o imovel existe
  const realEstate = await realEstateRepo.findOne({
    where: { id: payload.realEstateId },
  });

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  // Verifica se já existe um agendamento com a mesma data e hora no mesmo imovel
  const existingSchedule = await scheduleRepo
    .createQueryBuilder("schedule")
    .where(
      "schedule.date = :date AND schedule.hour = :hour AND schedule.realEstate.id = :realEstateId",
      {
        date: payload.date,
        hour: payload.hour,
        realEstateId: payload.realEstateId,
      }
    )
    .getOne();

  if (existingSchedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  // Verifica se mesmo usuario agendou visita no mesmo horario
  const existingUserScheduler = await scheduleRepo
    .createQueryBuilder("schedule")
    .where(
      "schedule.date = :date AND schedule.hour = :hour AND schedule.user.id = :userID",
      {
        date: payload.date,
        hour: payload.hour,
        userID: tokenId,
      }
    )
    .getOne();

  if (existingUserScheduler) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  // Verifica se o horario está dentro do horario comercial
  const hour = parseInt(payload.hour.split(":")[0]);
  if (hour < 8 || hour >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  // Verifica se o dia da semana é um dia util
  const date = new Date(payload.date);
  const weekday = date.getDay();
  if (weekday <= 0 || weekday >= 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  // Cria um novo agendamento
  const newSchedule = scheduleRepo.create({
    date: payload.date,
    hour: payload.hour,
    realEstate: { id: payload.realEstateId },
    user: { id: tokenId },
  });

  await scheduleRepo.save(newSchedule);

  return { message: "Schedule created" };
};

export default createScheduleService;
