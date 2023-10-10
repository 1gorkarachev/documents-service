import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SearchDocumentsDto,
  DocumentDto,
  CreateDocumentDto,
  CreateDocumentFieldDto,
} from './dto';
import {
  CreateDocumentCommand,
  DeleteDocumentCommand,
  SearchDocumentsQuery,
  UpdateDocumentCommand,
} from './dataAccess';
import { DocumentEntityToDocumentDtoMapper } from './mappers';
import { TemplateEntity } from 'src/template/dataAccess/entities';
import { FieldTypeEnum } from 'src/common/enums';
import { DocumentEntity } from './dataAccess/entities';

@Injectable()
export class DocumentService {
  public constructor(
    private readonly searchDocumentsQuery: SearchDocumentsQuery,
    private readonly createDocumentCommand: CreateDocumentCommand,
    private readonly updateDocumentComand: UpdateDocumentCommand,
    private readonly deleteDocumentCommand: DeleteDocumentCommand,
    private readonly documentMapper: DocumentEntityToDocumentDtoMapper,
  ) {}

  public async find({
    page,
    size,
  }: SearchDocumentsDto): Promise<DocumentDto[]> {
    const documents = await this.searchDocumentsQuery.execute({
      take: size,
      skip: page,
    });

    return documents.map((document) => this.documentMapper.map(document));
  }

  public async findOne(id: number): Promise<DocumentDto> {
    const document = await this.getDocumentById(id);

    return this.documentMapper.map(document);
  }

  public async create(
    template: TemplateEntity,
    data: CreateDocumentDto,
  ): Promise<DocumentDto> {
    this.validateFields(template, data.fields);

    const document = await this.createDocumentCommand.execute(data);

    return this.findOne(document.id);
  }

  public async update(
    id: number,
    template: TemplateEntity,
    data: CreateDocumentDto,
  ): Promise<DocumentDto> {
    this.validateFields(template, data.fields);

    const document = await this.getDocumentById(id);

    this.updateDocumentComand.execute(document, data);

    return this.findOne(document.id);
  }

  public async delete(id: number): Promise<void> {
    const document = await this.getDocumentById(id);

    return this.deleteDocumentCommand.execute(document);
  }

  private async getDocumentById(id: number): Promise<DocumentEntity> {
    const [document] = await this.searchDocumentsQuery.execute({
      where: { id },
    });

    if (!document) throw new NotFoundException();

    return document;
  }

  private validateFields(
    template: TemplateEntity,
    fields: CreateDocumentFieldDto[],
  ): void {
    const values: { [key in string]: string } = {};
    for (const field of fields) {
      values[field.id] = field.value;
    }

    for (const field of template.fields) {
      const value = values[field.id];

      if (!value) throw new BadRequestException();

      switch (field.type) {
        case FieldTypeEnum.date:
          if (isNaN(Date.parse(value))) throw new BadRequestException();
          break;
        case FieldTypeEnum.number:
          if (isNaN(+value)) throw new BadRequestException();
          break;
        case FieldTypeEnum.string:
          if (typeof value !== 'string') throw new BadRequestException();
          break;
      }
      delete values[field.id];
    }

    if (Object.keys(values).length > 0) throw new BadRequestException();
  }
}
