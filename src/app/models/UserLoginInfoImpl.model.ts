import {
  UserLoginInfo,
  PersonneEntity,
} from './../interfaces/user-login-infos';
export class UserLoginInfoImpl implements UserLoginInfo {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_authenticated: boolean;
  personne?: PersonneEntity[] | null;
}
