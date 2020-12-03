import { UserLoginInfo } from './../interfaces/user-login-infos';
import { BackendService } from './../services/backend.service';
import { TrelloCard } from './../interfaces/card-by-user';
import { Subscription, Observable } from 'rxjs';
import { UserService } from './../services/user.service';

import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authStatus: boolean;
  user: UserLoginInfo;
  authStatusSubscription: Subscription;
  userSubscription: Subscription;
  cards: TrelloCard[];
  cardSubscription: Subscription;

  constructor(private authService: AuthService,
              private userService: UserService,
              private backEndService: BackendService) { }
  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.authSubject.subscribe(
      (status: boolean) => {
        this.authStatus = status;
      }
    );
    this.authService.setAuthSatus(sessionStorage.getItem('isAuth') === 'true' ? true : false);
    this.authService.emitAuthStatus();
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: UserLoginInfo) => {
        this.user = user;
      }
    );
    this.userService.emitUser();
  }

  onLogout(){
    this.authService.signOut();
  }

}
