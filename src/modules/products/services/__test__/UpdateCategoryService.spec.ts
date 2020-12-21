import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from '../CreateCategoryService';
import UpdateCategoryService from '../UpdateCategoryService';

describe('UpdateCategoryService', () => {
  it('should be able to update a category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();

    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    const updateCategory = new UpdateCategoryService(fakeCategoryRepository);

    const category = await createCategory.execute({
      name: 'categoria',
    });

    const response = await updateCategory.execute({
      id: category.id,
      name: 'new category',
    });

    expect(response.name).toBe('new category');
  });

  it('should not be able to update a category with inexistent id', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();

    const updateCategory = new UpdateCategoryService(fakeCategoryRepository);

    expect(
      updateCategory.execute({
        id: 'wrongId',
        name: 'categoria',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a category with a name already registred', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();

    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    const updateCategory = new UpdateCategoryService(fakeCategoryRepository);

    const category1 = await createCategory.execute({
      name: 'categoria 1',
    });

    const category2 = await createCategory.execute({
      name: 'categoria 2',
    });

    expect(
      updateCategory.execute({
        id: category2.id,
        name: category1.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
