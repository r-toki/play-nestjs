import { PublicUser } from '../../types';
import { Tokens } from '../types';

export class SignUpResponse {
  tokens: Tokens;
  user: PublicUser;
}
