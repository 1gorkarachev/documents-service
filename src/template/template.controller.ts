import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('templates')
export class TemplateController {
  @Get()
  findAll(): string {
    return 'This action returns all templates';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} template`;
  }

  @Post()
  create(@Body() body: any): string {
    console.log(body);
    return 'This action create one template';
  }
}
