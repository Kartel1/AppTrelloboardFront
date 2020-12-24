import { AuthService } from './../services/auth.service';
import {
  LoadUserLoginAction,
  LoadUserLoginFailureAction,
  LoadUserLoginSuccessAction,
  LoadUserLogoutAction,
  UserActionTypes,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class UserEffects {
  @Effect() loadUser$ = this.actions$.pipe(
    ofType<LoadUserLoginAction>(UserActionTypes.LOAD_USER_LOGIN),
    mergeMap((data) =>
      this.authService.signIn(data.payload).pipe(
        map((user) => {
          return new LoadUserLoginSuccessAction(user);
        }),
        tap(() => {
          this.router.navigate(['home']);
        }),
        catchError((error) => of(new LoadUserLoginFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions$.pipe(
    ofType<LoadUserLogoutAction>(UserActionTypes.LOAD_USER_LOGOUT),
    tap(() => {
      this.authService.signOut();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
