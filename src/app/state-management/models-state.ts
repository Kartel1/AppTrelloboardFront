import { UserLoginInfo } from './../interfaces/user-login-infos';
export const UserLoginFeatureKey = 'user';

export interface UserLoginState {
  user: UserLoginInfo;
  loading: boolean;
  error: Error;
}
