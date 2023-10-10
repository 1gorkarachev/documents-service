import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto, SearchTemplatesDto } from './dto';
import { TemplateEntity } from './dataAccess/entities';

@Controller('templates')
export class TemplateController {
  public constructor(private readonly templateService: TemplateService) {}

  @Get()
  public findAll(
    @Query() params: SearchTemplatesDto,
  ): Promise<TemplateEntity[]> {
    return this.templateService.find(params);
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<TemplateEntity> {
    return this.templateService.findOne(id);
  }

  @Post()
  public create(@Body() body: CreateTemplateDto): Promise<TemplateEntity> {
    return this.templateService.create(body);
  }
}
