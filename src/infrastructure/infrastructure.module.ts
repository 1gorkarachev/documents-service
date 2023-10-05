import { Module } from '@nestjs/common';
import { ConfigModule } from './config/configModule';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class InfrastructureModule {}
