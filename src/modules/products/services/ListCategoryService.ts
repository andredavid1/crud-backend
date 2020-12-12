import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

class ListCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<Category[] | undefined> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}

export default ListCategoryService;
