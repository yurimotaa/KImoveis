import { Request, Response } from "express";
import { TScheduleRequest } from "../../interfaces/schedules.interfaces";
import createScheduleService from "../../services/schedules/createSchedule.service";
import getAllSchedulesByEstateIdService from "../../services/schedules/getAllSchedulesByEstateId.service";

const createScheduleController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const tokenId: number = response.locals.userId;
  const payload: TScheduleRequest = request.body;

  await createScheduleService(tokenId, payload);

  return response.status(201).json({ message: "Schedule created" });
};

const getAllSchedulesByEstateIdController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const isAdmin: boolean = response.locals.userAdmin;
  const realEstateId: number = parseInt(request.params.id);

  const schedules = await getAllSchedulesByEstateIdService(
    isAdmin,
    realEstateId
  );

  return response.status(200).json(schedules);
};

export { createScheduleController, getAllSchedulesByEstateIdController };
