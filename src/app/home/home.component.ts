import { UserLoginInfo } from './../interfaces/user-login-infos';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: UserLoginInfo;
  userSubscription: Subscription;
  route: ActivatedRoute;
  hasVerifier = false;
  params: Params;
  constructor(private authService: AuthService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.authService.setAuthSatus(sessionStorage.getItem('isAuth') === 'true' ? true : false);
    this.authService.emitAuthStatus();
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: UserLoginInfo) => {
        this.user = user;
      }
    );
    this.userService.emitUser();
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.hasVerifier = params['oauth_verifier'] === undefined ? false : true;
        this.params = params;
      });
    if (this.hasVerifier) {
      this.authService.endLoginToTrello(this.params);
    }
  }
  onRefreshFromTrello() { }
  onLoginToTrello() {
    this.authService.loginToTrello();
  }

}
