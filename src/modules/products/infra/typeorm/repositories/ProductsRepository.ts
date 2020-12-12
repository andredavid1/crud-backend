import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Not, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findDuplicatedForCreate({
    name,
    category_id,
  }: ICreateProductDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name, category_id },
    });
    return product;
  }

  public async findDuplicatedForUpdate({
    id,
    name,
    category_id,
  }: IUpdateProductDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id: Not(id), name, category_id },
    });
    return product;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async update(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
