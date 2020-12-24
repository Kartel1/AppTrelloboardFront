import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserLoginFeatureKey, UserLoginState } from './models-state';
import { UserLoginInfo } from './../interfaces/user-login-infos';

export interface AppState {
  [UserLoginFeatureKey]: UserLoginState;
}

export const selUser = createFeatureSelector<UserLoginState>('user');
export const selLog = createSelector(selUser, (state) => state.user);
export const auth = createSelector(selLog, (state) => state.is_authenticated);
