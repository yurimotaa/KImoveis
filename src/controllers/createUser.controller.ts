import { Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interfaces";
import { TUserResponse } from "../interfaces/users.interfaces";
import createUserService from "../services/createUser.service";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const userData: TUserRequest = request.body;

  const newUser: TUserResponse = await createUserService(userData);

  return response.status(201).json(newUser);
};

export { createUserController };
