import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DocumentDataAccessModule } from './dataAccess/document-data-access.module';
import * as mappers from './mappers';
import { TemplateModule } from 'src/template/template.module';

@Module({
  imports: [DocumentDataAccessModule, TemplateModule],
  controllers: [DocumentController],
  providers: [DocumentService, ...Object.values(mappers)],
})
export class DocumentsModule {}
