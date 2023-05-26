import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { VALID_INPUT } from '@shared/shared/tests/contants';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (POST) (bad request)', () => {
    const input = '{}';
    return request(app.getHttpServer())
      .post('/')
      .send(input)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .send(VALID_INPUT)
      .expect(HttpStatus.CREATED);
  });
});
