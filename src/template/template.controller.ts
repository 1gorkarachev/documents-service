import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto, SearchTemplatesDto } from './dto';
import { TemplateEntity } from './dataAccess/entities';

@Controller('templates')
export class TemplateController {
  public constructor(private readonly templateService: TemplateService) {}

  @Get()
  findAll(@Query() params: SearchTemplatesDto): Promise<TemplateEntity[]> {
    return this.templateService.find(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TemplateEntity> {
    return this.templateService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() body: CreateTemplateDto): Promise<TemplateEntity> {
    return this.templateService.create(body);
  }
}
