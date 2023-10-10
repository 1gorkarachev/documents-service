import { Injectable } from '@nestjs/common';
import { DocumentDto } from '../dto';
import { DocumentEntity, DocumentFieldEntity } from '../dataAccess/entities';
import { FieldEntity } from 'src/common/entities';
import { FieldTypeEnum } from 'src/common/enums';

@Injectable()
export class DocumentEntityToDocumentDtoMapper {
  public map(document: DocumentEntity): DocumentDto {
    return {
      id: document.id,
      name: document.name,
      template: document.template,
      fields: document.fields.map((documentField: DocumentFieldEntity) => ({
        name: documentField.field.name,
        value: this.castValue(documentField.field, documentField.value),
      })),
    };
  }

  private castValue(field: FieldEntity, value: string) {
    switch (field.type) {
      case FieldTypeEnum.string:
        return String(value);
      case FieldTypeEnum.number:
        return Number(value);
      case FieldTypeEnum.date:
        return new Date(value);
    }
  }
}
