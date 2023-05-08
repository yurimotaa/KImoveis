import { Request, Response } from "express";
import { TCategoryRequest } from "../../interfaces/categories.interfaces";
import createCategoryService from "../../services/categories/createCategory.service";
import getAllCategoriesService from "../../services/categories/getAllCategories.service";

const createCategoryController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const isAdmin: boolean = response.locals.userAdmin;
  const categoryBody: TCategoryRequest = request.body;
  const newCategory = await createCategoryService(isAdmin, categoryBody);

  return response.status(201).json(newCategory);
};

const getAllCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const categories = await getAllCategoriesService();

  return response.status(200).json(categories);
};

export { createCategoryController, getAllCategoriesController };
