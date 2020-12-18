import Product from '../infra/typeorm/entities/Product';
import IProductDTO from '../dtos/IProductDTO';

export default interface IProductRepository {
  create(productData: Omit<IProductDTO, 'id'>): Promise<Product>;
  findAll(): Promise<Product[] | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findDuplicated(
    productData: Omit<IProductDTO, 'id'>,
  ): Promise<Product | undefined>;
  update(productData: IProductDTO): Promise<Product>;
}
