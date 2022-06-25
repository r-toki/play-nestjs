import * as request from 'request';

// --- UTIL ---
const sleep = (ms = 0) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms),
  );

// --- SETUP ---
export const PROJECT_ID = 'play-nestjs';
export const FIRESTORE_EMULATOR_HOST = 'localhost:8080';

// --- CLEAR EMULATOR ---
export const clearFirestore = async () => {
  await request({
    url: `http://${FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`,
    method: 'DELETE',
  });
  await sleep(100);
};
