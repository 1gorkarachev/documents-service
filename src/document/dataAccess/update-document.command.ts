import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UpdateDocumentDto } from '../dto';
import { DocumentEntity } from './entities';
import { InsertDocumentCommand } from './insert-document.command';

@Injectable()
export class UpdateDocumentCommand extends InsertDocumentCommand {
  public constructor(private readonly dataSource: DataSource) {
    super();
  }

  public async execute(
    document: DocumentEntity,
    { template_id, name, fields }: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      document.name = name;
      document.template_id = template_id;

      entityManager.remove(document.fields);
      document.fields = this.prepareFields(fields);

      const updatedDocument = await entityManager.preload(
        DocumentEntity,
        document,
      );

      return entityManager.save(updatedDocument);
    });
  }
}
