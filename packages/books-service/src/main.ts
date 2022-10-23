import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('examples-books-service')
    .setDescription('The Books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  if (existsSync('./src')) {
    // save swagger json to disk: https://github.com/nestjs/swagger/issues/158
    // also can be visited by api/v1-json
    const out = JSON.stringify(document, null, 2)
    const newHash = createHash('md5').update(out).digest('hex')
    const path = './src/schema.swagger.json'
    if (existsSync(path) && newHash == createHash('md5').update(readFileSync(path)).digest('hex')) {
      Logger.debug(`same hash = ${newHash}`, 'Bootstrap')
    } else {
      writeFileSync(path, out)
    }
  }

  const port = 14202
  Logger.log(`listen at ${port}`, 'bootstrap')
  await app.listen(port);
}
bootstrap();
