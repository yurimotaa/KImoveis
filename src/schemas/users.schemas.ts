import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional().nullish(),
});

const requestUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const responseUserSchema = userSchema.omit({ password: true });

export { requestUserSchema, responseUserSchema, userSchema };
