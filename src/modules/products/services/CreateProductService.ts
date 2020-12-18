import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  category_id: string;
}

class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({ name, category_id }: IRequest): Promise<Product> {
    const checkProductExist = await this.productsRepository.findDuplicated({
      name,
      category_id,
    });

    if (checkProductExist) {
      throw new AppError('Product already registered');
    }

    const product = this.productsRepository.create({ name, category_id });

    return product;
  }
}

export default CreateProductService;
