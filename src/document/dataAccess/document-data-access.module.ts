import { Module } from '@nestjs/common';
import * as dataAccess from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity, DocumentFieldEntity } from './entities';

const providers = [...Object.values(dataAccess)];

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity, DocumentFieldEntity])],
  providers,
  exports: providers,
})
export class DocumentDataAccessModule {}
