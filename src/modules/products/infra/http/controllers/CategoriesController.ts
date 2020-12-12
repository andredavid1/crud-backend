import { Request, Response } from 'express';

import CategoriesRepository from '@modules/products/infra/typeorm/repositories/CategoriesRepository';
import CreateCategoryService from '@modules/products/services/CreateCategoryService';
import ListCategoryService from '@modules/products/services/ListCategoryService';
import UpdateCategoryService from '@modules/products/services/UpdateCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const categoriesRepository = new CategoriesRepository();

    const createCategory = new CreateCategoryService(categoriesRepository);

    const category = await createCategory.execute({ name });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const categoriesRepository = new CategoriesRepository();

    const listCategory = new ListCategoryService(categoriesRepository);

    const categories = await listCategory.execute();

    return response.json(categories);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const categoriesRepository = new CategoriesRepository();

    const updateCategory = new UpdateCategoryService(categoriesRepository);

    const category = await updateCategory.execute({ id, name });

    return response.json(category);
  }
}
