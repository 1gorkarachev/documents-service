import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDto } from '../config';
import { TemplateEntity } from 'src/template/dataAccess/entities';
import { FieldEntity } from 'src/common/entities';
import {
  DocumentEntity,
  DocumentFieldEntity,
} from 'src/document/dataAccess/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigDto],
      useFactory: (config: ConfigDto) => ({
        type: 'postgres',
        entities: [
          TemplateEntity,
          FieldEntity,
          DocumentEntity,
          DocumentFieldEntity,
        ],
        logging: 'all',
        logger: 'debug',
        extra: {
          max: config.pg.poolSize,
        },
        replication: {
          master: {
            url: config.pg.writeConnectionString,
          },
          slaves: [
            {
              url: config.pg.readConnectionString,
            },
          ],
        },
        connectTimeoutMS: config.pg.connectionTimeout,
      }),
    }),
  ],
})
export class PostgresModule {}
