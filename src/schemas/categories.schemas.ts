import { z } from "zod";

const requestCategorySchema = z.object({
  name: z.string().max(45),
});

const responseCategorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

export { requestCategorySchema, responseCategorySchema };
