import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { SignInDto, SignUpDto } from '../src/auth/dto';
import { Tokens } from '../src/auth/types';
import { CreatePostDto } from '../src/posts/dto';
import { AppModule } from './../src/app.module';
import { clearFirestore } from './test-helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let tokens: Tokens;

  beforeAll(async () => {
    await clearFirestore();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
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

    const singInDto: SignInDto = {
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

    it('should sign in', () => {
      return request(app.getHttpServer())
        .post('/auth/local/sign-in')
        .send(singInDto)
        .expect(200)
        .expect(({ body }: { body: Tokens }) => {
          expect(body.access_token).toBeTruthy();
          tokens = body;
        });
    });
  });

  describe('Posts', () => {
    const createPostDto: CreatePostDto = {
      title: 'Star Wars 1',
      body: 'This is the best movie',
    };

    it('should post', () => {
      return request(app.getHttpServer())
        .post('/posts')
        .auth(tokens.access_token, { type: 'bearer' })
        .send(createPostDto)
        .expect(201);
    });
  });
});
