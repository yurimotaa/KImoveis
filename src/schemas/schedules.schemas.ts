import { z } from "zod";

const scheduleSchemaRequest = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export { scheduleSchemaRequest };
