import { AuthUserModel } from './auth-user.model';
import { RefreshTokenModel } from './refresh-token.model';

export interface AuthModel {
  user: AuthUserModel;
  refreshToken: RefreshTokenModel;
}