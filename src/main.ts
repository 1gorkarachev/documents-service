import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigDto } from './infrastructure/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    await AppModule.register(),
  );

  const config = app.get(ConfigDto);
  app.useGlobalPipes(validationPipe);
  await app.listen(config.http.port, config.http.host);

  console.log(
    'Nest application listening on %s',
    await app.getUrl(),
    'NestApplication',
  );
}
bootstrap();
