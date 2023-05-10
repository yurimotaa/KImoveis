import { Request, Response } from "express";
import { TScheduleRequest } from "../../interfaces/schedules.interfaces";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const tokenId: number = response.locals.userId;
  const payload: TScheduleRequest = request.body;

  await createScheduleService(tokenId, payload);

  return response.status(201).json({ message: "Schedule created" });
};

export { createScheduleController };
