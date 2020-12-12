import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  create(productData: ICreateProductDTO): Promise<Product>;
  findAll(): Promise<Product[] | undefined>;
  findDuplicatedForCreate(
    productData: ICreateProductDTO,
  ): Promise<Product | undefined>;
  findDuplicatedForUpdate(
    productData: IUpdateProductDTO,
  ): Promise<Product | undefined>;
  update(productData: IUpdateProductDTO): Promise<Product>;
}
