import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import {
  SearchDocumentsDto,
  DocumentDto,
  CreateDocumentDto,
  UpdateDocumentDto,
} from './dto';
import { TemplateService } from 'src/template/template.service';

@Controller('documents')
export class DocumentController {
  public constructor(
    private readonly documentsService: DocumentService,
    private readonly templateService: TemplateService,
  ) {}

  @Get()
  public findAll(@Query() params: SearchDocumentsDto): Promise<DocumentDto[]> {
    return this.documentsService.find(params);
  }

  @Get(':id')
  public findOne(@Param('id') id: number) {
    return this.documentsService.findOne(id);
  }

  @Post()
  public async create(@Body() body: CreateDocumentDto): Promise<DocumentDto> {
    const template = await this.templateService.findOne(body.template_id);

    return this.documentsService.create(template, body);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() body: UpdateDocumentDto,
  ): Promise<DocumentDto> {
    const template = await this.templateService.findOne(body.template_id);

    return this.documentsService.update(id, template, body);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<void> {
    return this.documentsService.delete(id);
  }
}
