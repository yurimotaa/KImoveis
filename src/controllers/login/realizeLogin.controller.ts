import { Request, Response } from "express";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import realizeLoginService from "../../services/login/realizeLogin.service";

const realizeLoginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: TLoginRequest = request.body;

  const token: TLoginResponse = await realizeLoginService(loginData);

  return response.status(200).json(token);
};

export { realizeLoginController };
