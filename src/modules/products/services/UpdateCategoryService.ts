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
    const checkCategoryExist = await this.categoriesRepository.findDuplicatedForUpdate(
      { id, name },
    );

    if (checkCategoryExist) {
      throw new AppError('Category already registered');
    }

    const category = await this.categoriesRepository.update({ id, name });

    return category;
  }
}

export default UpdateCategoryService;
