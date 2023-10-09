import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { TemplateEntity } from './entities';
import { CreateTemplateDto, TemplateFieldsDto } from '../dto';
import { FieldEntity } from 'src/common/entities';

@Injectable()
export class CreateTemplateCommand {
  public constructor(private readonly dataSource: DataSource) {}

  public execute({ name, fields }: CreateTemplateDto): Promise<TemplateEntity> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const template = new TemplateEntity();
      template.name = name;
      template.fields = await this.syncFields(fields, entityManager);

      return entityManager.save(template);
    });
  }

  private async syncFields(
    fields: TemplateFieldsDto[],
    entityManager: EntityManager,
  ): Promise<FieldEntity[]> {
    const repository = entityManager.getRepository(FieldEntity);

    await repository
      .createQueryBuilder()
      .insert()
      .values(fields)
      .orIgnore('fields_unique_name_type')
      .returning(FieldEntity.columns)
      .execute();

    return repository.find({ where: fields });
  }
}
