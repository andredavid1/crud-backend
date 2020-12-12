import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute({ name }: IRequest): Promise<Category> {
    const checkCategoryExist = await this.categoriesRepository.findByName(name);

    if (checkCategoryExist) {
      throw new AppError('Category already registered');
    }

    const category = await this.categoriesRepository.create({ name });

    return category;
  }
}

export default CreateCategoryService;
