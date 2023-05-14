import { Request, Response } from "express";
import {
  TUser,
  TUserRequest,
  TUserUpdate,
} from "../../interfaces/users.interfaces";
import { TUserResponse } from "../../interfaces/users.interfaces";
import createUserService from "../../services/user/createUser.service";
import getAllUsersService from "../../services/user/getAllUsers.service";
import updateUserService from "../../services/user/updateUser.service";
import deleteUserService from "../../services/user/deleteUser.service";

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

const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const isAdmin: boolean = response.locals.userAdmin;
  const tokenId: number = response.locals.userId;
  const userData: TUserUpdate = request.body;
  const userId: number = parseInt(request.params.id);

  const newUser = await updateUserService(isAdmin, tokenId, userData, userId);

  return response.status(200).json(newUser);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const userId: number = parseInt(request.params.id);
  const isAdmin: boolean = response.locals.userAdmin;
  await deleteUserService(userId, isAdmin);
  return response.status(204).send();
};

export {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
};
