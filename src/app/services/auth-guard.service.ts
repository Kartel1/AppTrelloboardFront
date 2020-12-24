import { AppState } from './../state-management/app-state.model';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppState from '../state-management/app-state.model';
@Injectable()
export class AuthGuard implements CanActivate {
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isAuth$ = this.store.select(fromAppState.auth);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isAuth = false;
    this.isAuth$.subscribe((value) => {
      isAuth = value;
    });
    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
