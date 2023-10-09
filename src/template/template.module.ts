import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateDataAccessModule } from './dataAccess/template-data-access.module';

@Module({
  imports: [TemplateDataAccessModule],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
