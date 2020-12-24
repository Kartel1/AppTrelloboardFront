import { UserLoginInfo } from './../interfaces/user-login-infos';
import { AuthModel } from './../models/Auth.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  USER_LOGIN = '[USER] Login',
  LOAD_USER_LOGIN = '[USER] Load Login',
  LOAD_USER_LOGIN_SUCCESS = '[USER] Load Login Sucess',
  LOAD_USER_LOGIN_FAILURE = '[USER] Load Login Failure',
  LOAD_USER_LOGOUT = '[USER] Load Logout',
}

export class UserLoginAction implements Action {
  readonly type = UserActionTypes.USER_LOGIN;

  constructor(public payload: AuthModel) {}
}

export class LoadUserLoginAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_LOGIN;
  constructor(public payload: AuthModel) {}
}
export class LoadUserLoginSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_LOGIN_SUCCESS;
  constructor(public payload: UserLoginInfo) {}
}
export class LoadUserLoginFailureAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_LOGIN_FAILURE;
  constructor(public payload: Error) {}
}
export class LoadUserLogoutAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_LOGOUT;
}
export type UserAction =
  | LoadUserLoginAction
  | LoadUserLoginSuccessAction
  | LoadUserLoginFailureAction
  | LoadUserLogoutAction;
