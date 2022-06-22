import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { SignUpDto } from '../src/auth/dto';
import { Tokens } from '../src/auth/types';
import { AppModule } from './../src/app.module';
import { clearFirestore } from './test-helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await clearFirestore();
  });

  afterAll(async () => {
    await app.close();
    await clearFirestore();
  });

  describe('Auth', () => {
    const signUpDto: SignUpDto = {
      name: 'eizo',
      email: 'eizo@example.com',
      password: 'Password00',
    };

    it('should sign up', () => {
      return request(app.getHttpServer())
        .post('/auth/local/sign-up')
        .send(signUpDto)
        .expect(201)
        .expect(({ body }: { body: Tokens }) => {
          expect(body.access_token).toBeTruthy();
        });
    });
  });
});
