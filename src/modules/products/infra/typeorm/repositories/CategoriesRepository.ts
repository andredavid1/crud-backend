import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/products/dtos/IUpdateCategoryDTO';
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import { getRepository, Not, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[] | undefined> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
    });
    return category;
  }

  public async findDuplicatedForUpdate({
    id,
    name,
  }: IUpdateCategoryDTO): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id: Not(id), name },
    });
    return category;
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    await this.ormRepository.save(category);

    return category;
  }

  public async update(categoryData: IUpdateCategoryDTO): Promise<Category> {
    return this.ormRepository.save(categoryData);
  }
}

export default CategoriesRepository;
