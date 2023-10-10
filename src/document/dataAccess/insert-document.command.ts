import { CreateDocumentFieldDto } from '../dto';
import { DocumentFieldEntity } from './entities';

export abstract class InsertDocumentCommand {
  protected prepareFields(
    fields: CreateDocumentFieldDto[],
  ): DocumentFieldEntity[] {
    const documentFields: DocumentFieldEntity[] = [];

    for (const field of fields) {
      const documentField = new DocumentFieldEntity();
      documentField.field_id = field.id;
      documentField.value = field.value;

      documentFields.push(documentField);
    }

    return documentFields;
  }
}
