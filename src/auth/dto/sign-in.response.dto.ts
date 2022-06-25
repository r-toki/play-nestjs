import { User } from '../../types';
import { Tokens } from '../types';

export class SignInResponse {
  tokens: Tokens;
  user: User;
}
