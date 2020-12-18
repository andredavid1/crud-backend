import AppError from '@shared/errors/AppError';
import IProductDTO from '@modules/products/dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

class UpdateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({
    id,
    name,
    category_id,
  }: IProductDTO): Promise<Product> {
    const productFound = await this.productsRepository.findById(id);

    if (!productFound) {
      throw new AppError('Product not found.');
    }

    const existProduct = await this.productsRepository.findDuplicated({
      name,
      category_id,
    });

    if (existProduct && existProduct.id !== productFound.id) {
      throw new AppError('Product already registered.');
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
