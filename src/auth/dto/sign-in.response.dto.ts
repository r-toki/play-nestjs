import { PublicUser } from '../../types';
import { Tokens } from '../types';

export class SignInResponse {
  tokens: Tokens;
  user: PublicUser;
}
