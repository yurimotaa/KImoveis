import { z } from "zod";

const realStateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.number(),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
});

export { realStateSchema };
