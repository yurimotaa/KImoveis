import { z } from "zod";

const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional().nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const realEstateSchemaRequest = z.object({
  value: z.number().default(0).or(z.string().default("0")),
  size: z.number().min(1, { message: "Number must be greater than 0" }),
  address: addressSchema,
  categoryId: z.number(),
});

export { realEstateSchemaRequest, addressSchema };
