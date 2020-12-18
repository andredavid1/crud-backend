import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  id: string;
  name: string;
}

class UpdateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute({ id, name }: IRequest): Promise<Category> {
    const categoryFound = await this.categoriesRepository.findById(id);

    if (!categoryFound) {
      throw new AppError('Category not found.');
    }

    const existCategory = await this.categoriesRepository.findDuplicated(name);

    if (existCategory && existCategory.id !== categoryFound.id) {
      throw new AppError('Category already registered.');
    }

    const category = await this.categoriesRepository.update({ id, name });

    return category;
  }
}

export default UpdateCategoryService;
