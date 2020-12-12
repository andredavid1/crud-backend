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
});
