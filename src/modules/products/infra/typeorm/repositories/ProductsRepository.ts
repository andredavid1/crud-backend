import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';
import IProductDTO from '@modules/products/dtos/IProductDTO';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find({
      order: {
        created_at: 'ASC',
      },
    });

    return products;
  }

  public async findDuplicated({
    name,
    category_id,
  }: Omit<IProductDTO, 'id'>): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name, category_id },
    });
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });
    return product;
  }

  public async create(productData: Omit<IProductDTO, 'id'>): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async update(product: IProductDTO): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
