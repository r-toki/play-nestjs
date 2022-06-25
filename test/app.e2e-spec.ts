import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../src/auth/dto';
import { Tokens } from '../src/auth/types';
import { FireApp } from '../src/fire/fire-app';
import { CreatePostRequest, CreatePostResponse } from '../src/posts/dto';
import { AppModule } from './../src/app.module';
import { clearFirestore } from './test-helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let fireApp: FireApp;
  let tokens: Tokens;

  beforeAll(async () => {
    await clearFirestore();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    fireApp = moduleFixture.get<FireApp>(FireApp);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await clearFirestore();
  });

  describe('Auth', () => {
    const signUpDto: SignUpRequest = {
      name: 'eizo',
      email: 'eizo@example.com',
      password: 'Password00',
    };

    const singInDto: SignInRequest = {
      email: 'eizo@example.com',
      password: 'Password00',
    };

    it('should sign up', () => {
      return request(app.getHttpServer())
        .post('/auth/local/sign-up')
        .send(signUpDto)
        .expect(201)
        .expect(({ body }: { body: SignUpResponse }) => {
          expect(body.tokens.access_token).toBeTruthy();
        });
    });

    it('should sign in', () => {
      return request(app.getHttpServer())
        .post('/auth/local/sign-in')
        .send(singInDto)
        .expect(201)
        .expect(({ body }: { body: SignInResponse }) => {
          expect(body.tokens.access_token).toBeTruthy();
          tokens = body.tokens;
        });
    });
  });

  describe('Posts', () => {
    const createPostDto: CreatePostRequest = {
      title: 'Star Wars 1',
      body: 'This is the best movie',
    };

    it('should post', async () => {
      const { id } = await request(app.getHttpServer())
        .post('/posts')
        .auth(tokens.access_token, { type: 'bearer' })
        .send(createPostDto)
        .expect(201)
        .then(({ body }: { body: CreatePostResponse }) => body);

      const [postDoc] = await fireApp.db
        .collectionGroup('posts')
        .where('__id', '==', id)
        .get()
        .then(({ docs }) => docs);

      expect(postDoc.data()).toEqual(
        expect.objectContaining({
          title: 'Star Wars 1',
          body: 'This is the best movie',
        }),
      );
    });
  });
});
