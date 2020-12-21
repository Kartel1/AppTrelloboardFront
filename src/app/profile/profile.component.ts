import { UserLoginInfo } from './../interfaces/user-login-infos';
import { TrelloCard } from './../interfaces/card-by-user';
import { BackendService } from './../services/backend.service';
import { UserService } from './../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {'class': 'component'}
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserLoginInfo;
  userSubscription: Subscription;
  cards: TrelloCard[];
  cardSubscription: Subscription;
  cards$: Observable<TrelloCard[]>;
  isBoardReady = false;
  constructor(private backEndService: BackendService,
              private userService: UserService) { }

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: UserLoginInfo) => {
        this.user = user;
      }
    );
    this.userService.emitUser();
    this.cardSubscription = this.backEndService.cardSubject.subscribe(
      (cards: TrelloCard[]) => {
        this.cards = cards;
      }
    );
    this.cards$ = this.backEndService.cardSubject.pipe(share());
    this.backEndService.emitCard();
    this.backEndService.getTrelloBoardInfosByUser(this.user).pipe(share()).subscribe(
      (value: TrelloCard[]) => {
          this.cards = value.slice();
          this.backEndService.setCard(value);
          this.backEndService.emitCard();
          this.isBoardReady = true;
      },
      (error) => {
          console.log(error);
      }
  );
  // this.cards$ = this.backEndService.cardSubject.pipe(share());
  }
}

