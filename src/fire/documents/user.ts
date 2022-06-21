import { AppFireDocument } from '../lib';

export interface UserData {
  email: string;
}
export interface UserDoc extends UserData {}
export class UserDoc extends AppFireDocument<UserData> {}
