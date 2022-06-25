import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { SignInRequest, SignUpRequest } from '../src/auth/dto';
import { Tokens } from '../src/auth/types';
import { PostDoc } from '../src/fire/documents';
import { FireApp } from '../src/fire/fire-app';
import { CreatePostRequest, UpdatePostRequest } from '../src/posts/dto';
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
        .expect(({ body }: { body: { tokens: Tokens } }) => {
          expect(body.tokens.access_token).toBeTruthy();
        });
    });

    it('should sign in', () => {
      return request(app.getHttpServer())
        .post('/auth/local/sign-in')
        .send(singInDto)
        .expect(201)
        .expect(({ body }: { body: { tokens: Tokens } }) => {
          expect(body.tokens.access_token).toBeTruthy();
          tokens = body.tokens;
        });
    });
  });

  describe('Posts', () => {
    it('should create/update post', async () => {
      // NOTE: create
      const createPostDto: CreatePostRequest = {
        title: 'Star Wars 1',
        body: 'This is the best movie',
      };

      const { id } = await request(app.getHttpServer())
        .post('/posts')
        .auth(tokens.access_token, { type: 'bearer' })
        .send(createPostDto)
        .expect(201)
        .then(({ body }: { body: PostDoc['serialized'] }) => body);

      const [createdPostDoc] = await fireApp.db
        .collectionGroup('posts')
        .where('__id', '==', id)
        .get()
        .then(({ docs }) => docs);

      expect(createdPostDoc.data()).toEqual(
        expect.objectContaining({
          title: 'Star Wars 1',
          body: 'This is the best movie',
        }),
      );

      // NOTE: update
      const updatePostDto: UpdatePostRequest = {
        title: 'Star Wars 2',
        body: 'This is the worst movie',
      };

      await request(app.getHttpServer())
        .put(`/posts/${id}`)
        .auth(tokens.access_token, { type: 'bearer' })
        .send(updatePostDto)
        .expect(200);

      const [updatedPostDoc] = await fireApp.db
        .collectionGroup('posts')
        .where('__id', '==', id)
        .get()
        .then(({ docs }) => docs);

      expect(updatedPostDoc.data()).toEqual(
        expect.objectContaining({
          title: 'Star Wars 2',
          body: 'This is the worst movie',
        }),
      );
    });
  });
});
