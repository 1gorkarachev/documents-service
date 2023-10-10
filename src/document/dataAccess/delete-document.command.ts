import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { DocumentEntity } from './entities';

@Injectable()
export class DeleteDocumentCommand {
  public constructor(private readonly dataSource: DataSource) {}

  public execute(document: DocumentEntity): Promise<void> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      entityManager.remove(document.fields);
      entityManager.remove(document);
    });
  }
}
