import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AppModule {
  public static async register(): Promise<DynamicModule> {
    const { InfrastructureModule } = await import(
      './infrastructure/infrastructure.module'
    );

    return {
      module: AppModule,
      imports: [InfrastructureModule],
    };
  }
}
