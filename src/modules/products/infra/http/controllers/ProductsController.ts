import { Request, Response } from 'express';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductService from '@modules/products/services/ListProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, category_id } = request.body;

    const productsRepository = new ProductsRepository();

    const createProduct = new CreateProductService(productsRepository);

    const product = await createProduct.execute({ name, category_id });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const productsRepository = new ProductsRepository();

    const listProduct = new ListProductService(productsRepository);

    const products = await listProduct.execute();

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, category_id } = request.body;

    const productsRepository = new ProductsRepository();

    const updateProduct = new UpdateProductService(productsRepository);

    const product = await updateProduct.execute({ id, name, category_id });

    return response.json(product);
  }
}
