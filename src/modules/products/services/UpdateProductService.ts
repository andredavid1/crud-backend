import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  category_id: string;
}

class UpdateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({ id, name, category_id }: IRequest): Promise<Product> {
    const checkProductExist = await this.productsRepository.findDuplicatedForUpdate(
      { id, name, category_id },
    );

    if (checkProductExist) {
      throw new AppError('Product already registered');
    }

    const product = await this.productsRepository.update({
      id,
      name,
      category_id,
    });

    return product;
  }
}

export default UpdateProductService;
