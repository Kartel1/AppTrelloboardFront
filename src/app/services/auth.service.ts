import { UserLoginInfo } from './../interfaces/user-login-infos';
import { BackendService } from './backend.service';
import { Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/Auth.model';

@Injectable()
export class AuthService {
  isAuth = false;
  authSubject = new Subject<boolean>();
  user: UserLoginInfo;
  constructor(
    private httpClient: HttpClient,
    private backendService: BackendService,
    private router: Router
  ) {}

  signIn(auth: AuthModel): Observable<UserLoginInfo> {
    return this.httpClient.post<UserLoginInfo>(
      this.backendService.BACKENDROUTE + 'login',
      auth,
      this.backendService.httpOptions
    );
  }

  signOut() {
    this.httpClient
      .get(
        this.backendService.BACKENDROUTE + 'api-logout',
        this.backendService.httpOptions
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('Erreur de connexion ' + error);
        }
      );
  }

  loginToTrello() {
    this.httpClient
      .get<string>(
        this.backendService.BACKENDROUTE + 'trello-api-get-token',
        this.backendService.httpOptions
      )
      .subscribe(
        (value) => {
          window.location.replace(value);
        },
        (error) => {
          console.log('Erreur de connexion ' + error);
        }
      );
  }

  endLoginToTrello(params: Params) {
    this.httpClient
      .post(this.backendService.BACKENDROUTE + 'end-get-token/', params)
      .subscribe(
        (value) => {
          window.alert('Connexion effectuée');
          console.log('Connexion effectuée');
        },
        (error) => {
          window.alert('Echec connection à Trello');
        }
      );
  }

  refreshFromTrello() {}

  setAuthSatus(status: boolean) {
    this.isAuth = status;
  }

  emitAuthStatus() {
    this.authSubject.next(this.isAuth);
  }
}
