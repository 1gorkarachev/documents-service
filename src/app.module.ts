import { DynamicModule, Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { DocumentsModule } from './document/document.module';

@Module({})
export class AppModule {
  public static async register(): Promise<DynamicModule> {
    const { InfrastructureModule } = await import(
      './infrastructure/infrastructure.module'
    );

    return {
      module: AppModule,
      imports: [TemplateModule, DocumentsModule, InfrastructureModule],
    };
  }
}
