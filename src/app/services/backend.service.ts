import { UserLoginInfo } from './../interfaces/user-login-infos';
import { TrelloCard, SprintEntity } from './../interfaces/card-by-user';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {
  BACKENDROUTE = 'http://127.0.0.1:8000/api/';
  private cards: TrelloCard[] = [];
  cardSubject = new Subject<TrelloCard[]>();
  private sprints: SprintEntity[] = [];
  sprintsSubject = new Subject<SprintEntity[]>();
  private selectedSprint: SprintEntity;
  selectedSprintSubject = new Subject<SprintEntity>();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getTrelloBoardInfosByUser(user: UserLoginInfo): Observable<TrelloCard[]> {
    const myslug = user.personne[0].slug;
    return this.httpClient.get<TrelloCard[]>(
      this.BACKENDROUTE + 'get-personne-tab-infos/' + myslug + '/',
      this.httpOptions
    );
  }
  setTrelloBoardCardEffort(card: TrelloCard): Observable<any> {
    return this.httpClient.post(
      this.BACKENDROUTE + 'set-card-effort/',
      card,
      this.httpOptions
    );
  }

  getTrelloBoardCardEffort(
    user: UserLoginInfo,
    sprint: number,
    day: number
  ): Observable<TrelloCard[]> {
    const data = {
      slug: user.personne[0].slug,
      sprint_value: sprint,
      sprint_day: day,
    };
    return this.httpClient.post<TrelloCard[]>(
      this.BACKENDROUTE + 'get-burndown/',
      data,
      this.httpOptions
    );
  }

  getTrelloBoardSprints(): Observable<SprintEntity[]> {
    return this.httpClient.get<SprintEntity[]>(
      this.BACKENDROUTE + 'get-sprints/',
      this.httpOptions
    );
  }

  setCard(cards: TrelloCard[]) {
    this.cards = cards.slice();
  }

  setSprints(sprints: SprintEntity[]) {
    this.sprints = sprints.slice();
  }

  setSelectedSprint(selectedSprint: SprintEntity) {
    this.selectedSprint = selectedSprint;
  }

  emitSprints() {
    this.sprintsSubject.next(this.sprints.slice());
  }

  emitSelectedSprint() {
    this.selectedSprintSubject.next(this.selectedSprint);
  }

  emitCard() {
    this.cardSubject.next(this.cards.slice());
  }
}
