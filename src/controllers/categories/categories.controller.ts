import { Request, Response } from "express";
import { TCategoryRequest } from "../../interfaces/categories.interfaces";
import createCategoryService from "../../services/categories/createCategory.service";
import getAllCategoriesService from "../../services/categories/getAllCategories.service";
import listAllPropertiesInTheCategoryService from "../../services/categories/listAllPropertiesInTheCategory.service";

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

const listAllPropertiesInTheCategoryController = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const categoryId: number = parseInt(request.params.id);
  const allProperties = await listAllPropertiesInTheCategoryService(categoryId);
  return response.status(200).json(allProperties);
};

export {
  createCategoryController,
  getAllCategoriesController,
  listAllPropertiesInTheCategoryController,
};
