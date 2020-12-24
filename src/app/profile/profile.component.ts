import { AppState } from './../state-management/app-state.model';
import { Store } from '@ngrx/store';
import { UserLoginInfo } from './../interfaces/user-login-infos';
import { TrelloCard } from './../interfaces/card-by-user';
import { BackendService } from './../services/backend.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { share } from 'rxjs/operators';
import { HostBinding } from '@angular/core';
import * as fromAppState from '../state-management/app-state.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userlog: UserLoginInfo;
  cards: TrelloCard[];
  cardSubscription: Subscription;
  cards$: Observable<TrelloCard[]>;
  isBoardReady = false;
  @HostBinding('class') class = 'component';
  user$: Observable<UserLoginInfo>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private backEndService: BackendService,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.user$ = this.store.select(fromAppState.selLog);
    this.user$.subscribe((user) => (this.userlog = user));
    this.cardSubscription = this.backEndService.cardSubject.subscribe(
      (cards: TrelloCard[]) => {
        this.cards = cards;
      }
    );
    this.cards$ = this.backEndService.cardSubject.pipe(share());
    this.backEndService.emitCard();
    this.backEndService
      .getTrelloBoardInfosByUser(this.userlog)
      .pipe(share())
      .subscribe(
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
  }
}
