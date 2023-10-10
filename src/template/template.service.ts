import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto, SearchTemplatesDto } from './dto';
import { CreateTemplateCommand } from './dataAccess';
import { TemplateEntity } from './dataAccess/entities';
import { SearchTemplateQuery } from './dataAccess/search-template.query';

@Injectable()
export class TemplateService {
  public constructor(
    private readonly createTemplateCommand: CreateTemplateCommand,
    private readonly searchTemplateQuery: SearchTemplateQuery,
  ) {}

  public create(data: CreateTemplateDto): Promise<TemplateEntity> {
    return this.createTemplateCommand.execute(data);
  }

  public find({ page, size }: SearchTemplatesDto): Promise<TemplateEntity[]> {
    return this.searchTemplateQuery.execute({
      skip: page,
      take: size,
    });
  }

  public async findOne(id: number): Promise<TemplateEntity> {
    const [template] = await this.searchTemplateQuery.execute({
      where: { id: id },
    });

    if (!template) throw new NotFoundException();

    return template;
  }
}
