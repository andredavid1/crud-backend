import { uuid } from 'uuidv4';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[] | undefined> {
    return this.products;
  }

  public async findDuplicatedForCreate({
    name,
    category_id,
  }: ICreateProductDTO): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product => product.name === name && product.category_id === category_id,
    );

    return findProduct;
  }

  public async findDuplicatedForUpdate({
    id,
    name,
    category_id,
  }: IUpdateProductDTO): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product =>
        product.name === name &&
        product.category_id === category_id &&
        product.id !== id,
    );

    return findProduct;
  }

  public async create({
    name,
    category_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid(), name, category_id });

    this.products.push(product);

    return product;
  }

  public async update({ id, name, category_id }: Product): Promise<Product> {
    const index = this.products.findIndex(product => product.id === id);

    this.products[index].name = name;
    this.products[index].category_id = category_id;

    return this.products[index];
  }
}

export default ProductsRepository;
