import { Module } from '@nestjs/common';
import * as dataAccess from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entities';

const providers = [...Object.values(dataAccess)];

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
  providers,
  exports: providers,
})
export class TemplateDataAccessModule {}
