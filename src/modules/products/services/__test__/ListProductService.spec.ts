import FakeProductRepository from '../../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import ListProductService from '../ListProductService';

describe('ListProductsService', () => {
  it('should be able to list the existents products', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);
    const listProducts = new ListProductService(fakeProductRepository);

    const product1 = await createProduct.execute({
      name: 'Product1',
      category_id: 'idCategory',
    });

    const product2 = await createProduct.execute({
      name: 'Product2',
      category_id: 'idCategory',
    });

    const products = await listProducts.execute();

    expect(products).toEqual([product1, product2]);
  });
});
