import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import * as bcrypt from "bcryptjs";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { responseUserSchema } from "../schemas/users.schemas";

const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  userData.password = await bcrypt.hash(userData.password, 10);
  if (!("admin" in userData)) {
    userData.admin = false;
  }

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepo.create(userData);

  await userRepo.save(user);

  const userZod: TUserResponse = responseUserSchema.parse(user);
  return userZod;
};

export default createUserService;
