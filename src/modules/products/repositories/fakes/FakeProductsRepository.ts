import { uuid } from 'uuidv4';

import IProductDTO from '@modules/products/dtos/IProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[] | undefined> {
    return this.products;
  }

  public async findDuplicated({
    name,
    category_id,
  }: Omit<IProductDTO, 'id'>): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product => product.name === name && product.category_id === category_id,
    );

    return findProduct;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async create({
    name,
    category_id,
  }: Omit<IProductDTO, 'id'>): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid(), name, category_id });

    this.products.push(product);

    return product;
  }

  public async update({
    id,
    name,
    category_id,
  }: IProductDTO): Promise<Product> {
    const index = this.products.findIndex(product => product.id === id);

    this.products[index].name = name;
    this.products[index].category_id = category_id;

    return this.products[index];
  }
}

export default FakeProductsRepository;
