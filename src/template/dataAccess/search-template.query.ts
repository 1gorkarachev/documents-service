import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entities';
import { Repository } from 'typeorm';

interface ISearchTemplatesParams {
  where?: {
    id?: number;
  };
  skip?: number;
  take?: number;
}

export class SearchTemplateQuery {
  public constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  public execute({
    where,
    skip,
    take,
  }: ISearchTemplatesParams): Promise<TemplateEntity[]> {
    return this.templateRepository.find({
      where,
      relations: ['fields'],
      take: take ?? undefined,
      skip: skip ? skip * take : undefined,
    });
  }
}
