import { Module } from '@nestjs/common';
import { ConfigModule } from './config/configModule';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [ConfigModule.forRoot(), PostgresModule],
})
export class InfrastructureModule {}
