import { UserLoginInfo } from './../interfaces/user-login-infos';
import { UserService } from './../services/user.service';
import { share } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SprintEntity } from './../interfaces/card-by-user';
import { BackendService } from './../services/backend.service';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state-management/app-state.model';
import * as fromAppState from '../state-management/app-state.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  sprints: SprintEntity[];
  sprintsSubscription: Subscription;
  selectedSprint: SprintEntity;
  selectedSprintSubscription: Subscription;
  user: UserLoginInfo;
  userSubscription: Subscription;
  @HostBinding('class') class = 'component';

  constructor(
    private backendService: BackendService,
    private userService: UserService,
    private store: Store<AppState>
  ) {}
  ngOnDestroy(): void {
    this.backendService.setSelectedSprint(undefined);
    this.sprintsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    /*  this.userSubscription = this.userService.user$.subscribe(
      (user) => (this.user = user)
    ); */
    this.store
      .select(fromAppState.selLog)
      .subscribe((user) => (this.user = user));
    this.sprintsSubscription = this.backendService.sprintsSubject.subscribe(
      (sprints: SprintEntity[]) => {
        this.sprints = sprints;
      }
    );
    this.backendService.emitSprints();
    this.selectedSprintSubscription =
      this.backendService.selectedSprintSubject.subscribe(
        (selectedSprint: SprintEntity) => {
          this.selectedSprint = selectedSprint;
        }
      );
    this.backendService.emitSelectedSprint();
    this.backendService
      .getTrelloBoardSprints()
      .pipe(share())
      .subscribe((sprints: SprintEntity[]) => {
        this.sprints = sprints;
        this.backendService.setSprints(this.sprints);
        this.backendService.emitSprints();
      });
  }

  OnSelectedSprint(i: number) {
    this.selectedSprint = this.sprints[i];
    this.backendService.setSelectedSprint(this.selectedSprint);
    this.backendService.emitSelectedSprint();
  }
}
