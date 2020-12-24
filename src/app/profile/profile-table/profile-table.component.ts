import { Observable, Subscription } from 'rxjs';
import { UserLoginInfo } from './../../interfaces/user-login-infos';
import { TrelloCard } from './../../interfaces/card-by-user';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss'],
})
export class ProfileTableComponent implements OnInit, OnDestroy {
  @Input() user: UserLoginInfo;
  cards: TrelloCard[];
  @Input() cards$: Observable<TrelloCard[]>;
  userSubscription: Subscription;
  cardSubscription: Subscription;
  alreadyEdited: boolean;
  constructor(private backEndService: BackendService) {}

  ngOnInit(): void {
    this.cards$.subscribe((value) => (this.cards = value));
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
    this.backEndService
      .setTrelloBoardCardEffort(this.cards[id])
      .pipe(share())
      .subscribe(() => {
        this.editionStatusCheck(id);
        this.backEndService.emitCard();
      });
  }

  onEditionCancel(id: number) {
    this.editionStatusCheck(id);
  }

  ngOnDestroy(): void {}
}
