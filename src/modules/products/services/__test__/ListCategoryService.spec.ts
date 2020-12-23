import FakeCategoryRepository from '../../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from '../CreateCategoryService';
import ListCategoryService from '../ListCategoryService';

describe('ListCategoriesService', () => {
  it('should be able to list the existents categories', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategory = new CreateCategoryService(fakeCategoryRepository);
    const listCategories = new ListCategoryService(fakeCategoryRepository);

    const category1 = await createCategory.execute({
      name: 'category1',
    });

    const category2 = await createCategory.execute({
      name: 'category2',
    });

    const categories = await listCategories.execute();

    expect(categories).toEqual([category1, category2]);
  });
});
