import { initialState } from './reducers';
import { UserAction, UserActionTypes } from './actions';
import { AppState } from '../state-management/app-state.model';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { UserLoginReducer } from './reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { UserLoginFeatureKey } from './models-state';

export const reducers: ActionReducerMap<AppState> = { user: UserLoginReducer };

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [UserLoginFeatureKey],
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);
}

export function logout(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state: AppState, action: Action) => {
    return reducer(
      action.type === UserActionTypes.LOAD_USER_LOGOUT ? undefined : state,
      action
    );
  };
}
export const metaReducers: MetaReducer<AppState>[] = [
  logout,
  localStorageSyncReducer,
];
