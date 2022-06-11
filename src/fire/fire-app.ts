import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

@Injectable()
export class FireApp {
  auth: Auth;
  db: Firestore;
  storage: Storage;

  constructor(configService: ConfigService) {
    const projectId = configService.get<string>('GCLOUD_PROJECT');
    initializeApp({ storageBucket: projectId + '.appspot.com' });
    this.auth = getAuth();
    this.db = getFirestore();
    this.storage = getStorage();
  }
}
