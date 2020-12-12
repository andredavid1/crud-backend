import FakeProductRepository from '../../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';

describe('CreateProductService', () => {
  it('should be able to create a new product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    const product = await createProduct.execute({
      name: 'produto',
      category_id: 'idCategoria',
    });

    expect(product).toHaveProperty('id');
    expect(product.name).toBe('produto');
    expect(product.category_id).toBe('idCategoria');
  });
});
