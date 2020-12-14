import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from '../CreateCategoryService';

describe('CreateCategoryService', () => {
  it('should be able to create a new category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    const category = await createCategory.execute({
      name: 'categoria',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('categoria');
  });

  it('should not be able to create a duplicate category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    await createCategory.execute({
      name: 'categoria',
    });

    expect(
      createCategory.execute({
        name: 'categoria',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
