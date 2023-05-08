import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  deletedAt: z.string().nullish(),
});

const requestUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const responseUserSchema = userSchema.omit({ password: true });

const usersArraySchema = z.array(responseUserSchema);

const updateUserSchema = userSchema.omit({
  id: true,
  admin: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const updateUserRequestSchema = userSchema
  .omit({
    id: true,
    admin: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .partial();

export {
  requestUserSchema,
  responseUserSchema,
  userSchema,
  usersArraySchema,
  updateUserSchema,
  updateUserRequestSchema,
};
