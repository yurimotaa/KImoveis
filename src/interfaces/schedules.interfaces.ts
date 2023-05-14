import { z } from "zod";
import { scheduleSchemaRequest } from "../schemas/schedules.schemas";
import { Address, Category, Schedule } from "../entities";

type TScheduleRequest = z.infer<typeof scheduleSchemaRequest>;

interface IScheduleResponse {
  address: Address;
  category: Category;
  createdAt: Date | string;
  id: number;
  schedules: Schedule[];
  size: number;
  sold: boolean;
  updatedAt: Date | string;
  value: string | number;
}

interface IMessageReturn {
  message: string;
}

export { TScheduleRequest, IScheduleResponse, IMessageReturn };
