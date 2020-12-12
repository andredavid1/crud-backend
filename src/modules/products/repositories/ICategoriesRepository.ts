import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(categoryData: ICreateCategoryDTO): Promise<Category>;
  findAll(): Promise<Category[] | undefined>;
  findDuplicatedForCreate(name: string): Promise<Category | undefined>;
  findDuplicatedForUpdate(
    categoryData: IUpdateCategoryDTO,
  ): Promise<Category | undefined>;
  update(categoryData: IUpdateCategoryDTO): Promise<Category>;
}
