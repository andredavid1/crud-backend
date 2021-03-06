import ICategoryDTO from '@modules/products/dtos/ICategoryDTO';
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(
    categoryData: Omit<ICategoryDTO, 'id'>,
  ): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    await this.ormRepository.save(category);

    return category;
  }

  public async findAll(): Promise<Category[] | undefined> {
    const categories = await this.ormRepository.find({
      order: {
        created_at: 'ASC',
      },
    });

    return categories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id },
    });
    return category;
  }

  public async findDuplicated(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
    });
    return category;
  }

  public async update(categoryData: ICategoryDTO): Promise<Category> {
    return this.ormRepository.save(categoryData);
  }
}

export default CategoriesRepository;
