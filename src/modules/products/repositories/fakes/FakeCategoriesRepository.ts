import { uuid } from 'uuidv4';

import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/products/dtos/IUpdateCategoryDTO';
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import Category from '@modules/products/infra/typeorm/entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findAll(): Promise<Category[] | undefined> {
    return this.categories;
  }

  public async findDuplicatedForCreate(
    name: string,
  ): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.name === name,
    );

    return findCategory;
  }

  public async findDuplicatedForUpdate({
    id,
    name,
  }: IUpdateCategoryDTO): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.name === name && category.id !== id,
    );

    return findCategory;
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), name });

    this.categories.push(category);

    return category;
  }

  public async update({ id, name }: IUpdateCategoryDTO): Promise<Category> {
    const index = this.categories.findIndex(category => category.id === id);

    this.categories[index].name = name;

    return this.categories[index];
  }
}

export default CategoriesRepository;
