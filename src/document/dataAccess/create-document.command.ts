import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateDocumentDto } from '../dto';
import { DocumentEntity } from './entities';
import { InsertDocumentCommand } from './insert-document.command';

@Injectable()
export class CreateDocumentCommand extends InsertDocumentCommand {
  public constructor(private readonly dataSource: DataSource) {
    super();
  }

  public execute({
    template_id,
    name,
    fields,
  }: CreateDocumentDto): Promise<DocumentEntity> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const document = new DocumentEntity();
      document.template_id = template_id;
      document.name = name;
      document.fields = this.prepareFields(fields);

      return entityManager.save(document);
    });
  }
}
