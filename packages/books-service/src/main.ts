import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const port = 14201
  Logger.log(`listen at ${port}`, 'bootstrap')
  await app.listen(port);
}
bootstrap();
