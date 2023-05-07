import { Request, Response } from "express";
import { TUserRequest } from "../../interfaces/users.interfaces";
import { TUserResponse } from "../../interfaces/users.interfaces";
import createUserService from "../../services/user/createUser.service";
import getAllUsersService from "../../services/user/getAllUsers.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const userData: TUserRequest = request.body;

  const newUser: TUserResponse = await createUserService(userData);

  return response.status(201).json(newUser);
};

const getAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const isAdmin: boolean = response.locals.userAdmin;
  const users = await getAllUsersService(isAdmin);

  return response.status(200).json(users);
};

export { createUserController, getAllUsersController };
