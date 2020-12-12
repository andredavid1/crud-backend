import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

class ListProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute(): Promise<Product[] | undefined> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ListProductService;
