import ICategoryDTO from '../dtos/ICategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(categoryData: Omit<ICategoryDTO, 'id'>): Promise<Category>;
  findAll(): Promise<Category[] | undefined>;
  findDuplicated(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
  update(categoryData: ICategoryDTO): Promise<Category>;
}
