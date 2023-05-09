import { Request, Response } from "express";
import { TRealEstateRequest } from "../../interfaces/realEstate.interfaces";
import createRealEstateService from "../../services/realEstates/createRealEstate.service";
import listAllRealEstatesService from "../../services/realEstates/listAllRealEstates.service";

const createRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const payload: TRealEstateRequest = request.body;
  const isAdmin: boolean = response.locals.userAdmin;

  const newRealEstate = await createRealEstateService(payload, isAdmin);

  return response.status(201).json(newRealEstate);
};

const listAllRealEstatesController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const realEstates = await listAllRealEstatesService();

  return response.status(200).json(realEstates);
};

export { createRealEstateController, listAllRealEstatesController };
