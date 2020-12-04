import { Observable, Subscription } from 'rxjs';
import { UserLoginInfo } from './../../interfaces/user-login-infos';
import { TrelloCard } from './../../interfaces/card-by-user';
import { UserService } from './../../services/user.service';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit, OnDestroy {

  user: UserLoginInfo;
  // @Input() cards: TrelloCard[];
  cards: TrelloCard[];
  // cards$: Observable<TrelloCard[]>;
  userSubscription: Subscription;
  cardSubscription: Subscription;
  alreadyEdited: boolean;
  constructor(private backEndService: BackendService,
              private userService: UserService,
              private cdRef: ChangeDetectorRef) {
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
    this.backEndService.emitCard();
    // this.cards$ = this.backEndService.cardSubject.pipe(share());
  }

  onEdition(id: number) {
    this.editionStatusCheck(id);
  }

  editionStatusCheck(id: number) {
    if (this.cards[id].isEdited) {
      this.cards[id].isEdited = false;
      this.alreadyEdited = false;
    } else if (!this.alreadyEdited) {
      this.cards[id].isEdited = true;
      this.alreadyEdited = true;
    }

    return this.cards[id].isEdited;
  }

  onEditionSave(id: number) {
    this.backEndService.setTrelloBoardCardEffort(this.cards[id]).pipe(share()).subscribe(
      () => {
        this.editionStatusCheck(id);
        this.backEndService.emitCard();
      }
    );
  }

  onEditionCancel(id: number) {
    this.editionStatusCheck(id);
  }

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
