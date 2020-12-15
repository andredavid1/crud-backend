// import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../../repositories/fakes/FakeCategoriesRepository';
import ListCategoryService from '../ListCategoryService';

describe('ListCategoryService', () => {
  it('should be able to list existents users', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const listCategory = new ListCategoryService(fakeCategoryRepository);

    const categories = await listCategory.execute();

    expect(categories).toHaveProperty('id');
  });
});
