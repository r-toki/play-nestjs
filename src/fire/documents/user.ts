import { FireDocument } from 'fire-hose-admin';

export interface UserData {
  name: string;
}
export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {}
