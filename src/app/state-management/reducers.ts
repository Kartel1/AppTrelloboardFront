import { AuthService } from './../../../../my-project/src/app/services/auth.service';
import { UserLoginInfo } from './../interfaces/user-login-infos';
import { UserAction, UserActionTypes } from './actions';
import { UserLoginState } from './models-state';
const initialUser: UserLoginInfo = {
  id: -1,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  is_active: false,
  is_authenticated: false,
};

export const initialState: UserLoginState = {
  user: initialUser,
  loading: false,
  error: undefined,
};

export function UserLoginReducer(
  state: UserLoginState = initialState,
  action: UserAction
) {
  switch (action.type) {
    case UserActionTypes.LOAD_USER_LOGIN:
      return { ...state, loading: true };
    case UserActionTypes.LOAD_USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case UserActionTypes.LOAD_USER_LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UserActionTypes.LOAD_USER_LOGOUT:
      return state;
    default:
      return state;
  }
}
