import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../CreateProductService';
import UpdateProductService from '../UpdateProductService';

describe('UpdateProductService', () => {
  it('should be able to update a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);

    const updateProduct = new UpdateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'produto',
      category_id: 'idcategoria',
    });

    const response = await updateProduct.execute({
      id: product.id,
      name: 'new product',
      category_id: product.category_id,
    });

    expect(response.name).toBe('new product');
  });

  it('should not be able to update a category with inexistent id', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const updateProduct = new UpdateProductService(fakeProductsRepository);

    expect(
      updateProduct.execute({
        id: 'wrongId',
        name: 'produto',
        category_id: 'idCategoria',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a category with a email already registred', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);

    const updateProduct = new UpdateProductService(fakeProductsRepository);

    const product1 = await createProduct.execute({
      name: 'produto 1',
      category_id: 'idCategoria',
    });

    const product2 = await createProduct.execute({
      name: 'produto 2',
      category_id: 'idCategoria',
    });

    expect(
      updateProduct.execute({
        id: product2.id,
        name: product1.name,
        category_id: product2.category_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
