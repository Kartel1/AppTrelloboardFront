import { gsap } from 'gsap';
import { UserLoginInfo } from './../interfaces/user-login-infos';
import { BackendService } from './../services/backend.service';
import { TrelloCard } from './../interfaces/card-by-user';
import { Subscription, Observable } from 'rxjs';
import { UserService } from './../services/user.service';

import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

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
  toggle = false;
  tl = gsap.timeline({defaults: { ease: "power2.Out"}});


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

    this.createTimeline();
    
  }


  onLogout() {
    this.authService.signOut();
  }

  createTimeline(){
    this.tl.to('.navbar-nav',.6,{display: 'block', scaleY: 1, onReverseComplete:() => {gsap.set('.navbar-nav',{clearProps:'all'})}})
    .to('.nav-item', .1,{opacity: 1 , x:0, stagger:.1, onReverseComplete: () => {gsap.set('.nav-item',{clearProps: 'all'})}},"+=.15");
    this.tl.reverse();
    this.tl.pause();
  }
  onMenuClick(){
      this.tl.reversed() ? this.tl.play() : this.tl.reverse();
  }

}
