import { ConsoleLogger, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(new ConsoleLogger('TEST', { logLevels: ['debug', 'log', 'warn', 'error'] }))
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = moduleFixture.get<DataSource>(DataSource)
  });

  afterAll(async () => {
    await app.close()

    // not necessary
    // dataSource && await dataSource.destroy().then(() => console.log(`dataSource closed`))
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('{"hello":"Hello World!"}');
  });

  it('/ (GET) 2', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('{"hello":"Hello World!"}');
  });
});
