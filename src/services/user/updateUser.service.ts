import { Repository } from "typeorm";
import { AppError } from "../../error";
import {
  TUser,
  TUserResponse,
  TUserUpdate,
} from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  isAdmin: boolean,
  tokenId: number,
  userData: TUserUpdate,
  userId: number
): Promise<TUserResponse> => {
  if (!isAdmin && Number(tokenId) !== userId) {
    throw new AppError("Insufficient permission", 403);
  }

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const updatedUser: User = await userRepo.save({
    id: userId,
    ...userData,
  });

  const newUser = await userRepo.findOneBy({ id: updatedUser.id });

  const zodUser: TUserResponse = responseUserSchema.parse(newUser);

  return zodUser;
};

export default updateUserService;
