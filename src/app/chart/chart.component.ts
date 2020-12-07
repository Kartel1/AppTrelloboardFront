import { share } from 'rxjs/operators';
import { CardTracking, SprintEntity } from './../interfaces/card-by-user';
import { UserService } from './../services/user.service';
import { BackendService } from './../services/backend.service';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Subscription, Observable, of } from 'rxjs';
import { TrelloCard } from '../interfaces/card-by-user';
import { UserLoginInfo } from '../interfaces/user-login-infos';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges {

  @Input() user: UserLoginInfo;
  // userSubscription: Subscription;
  cards: TrelloCard[];
  // cardSubscription: Subscription;
  @Input() selectedSprint: SprintEntity;
  // selectedSprintSubscription: Subscription;
  dataToDisplay: number[];
  isChartReady = false;


  constructor(private backendService: BackendService,
              private userService: UserService) {

  }
  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit(): void {

    // this.userSubscription = this.userService.userSubject.subscribe(
    //   (user: UserLoginInfo) => {
    //     this.user = user;
    //   }
    // );
    // this.userService.emitUser();
    // this.cardSubscription = this.backendService.cardSubject.subscribe(
    //   (cards: TrelloCard[]) => {
    //     this.cards = cards.slice();
    //   }
    // );
    // this.backendService.emitCard();
    // this.selectedSprintSubscription = this.backendService.selectedSprintSubject.subscribe(
    //   (selectedSprint: SprintEntity) => {
    //     this.selectedSprint = selectedSprint;
    //   }
    // );
    // this.backendService.emitSelectedSprint();
    // let globalEffort = 0;
    // let leadingCoeff: number;
    // const idealLine: number[] = [];
    // const date = new Date(Date.now());
    // const dateMoment = moment(date, 'DD/MM/YYYY');
    // const beggingDate = moment(this.selectedSprint.start_date, 'YYYY-MM-DD');
    // const endDate = moment(this.selectedSprint.end_date, 'YYYY-MM-DD');
    // const duration = endDate.diff(beggingDate, 'days');
    // const currentDay = endDate.diff(dateMoment, 'days') > 0 ? dateMoment.diff(beggingDate, 'days') : duration;
    // this.backendService.getTrelloBoardCardEffort(this.user, this.selectedSprint.sprint_number, currentDay).pipe(share()).subscribe(
    //   (value: TrelloCard[]) => {
    //     // this.backendService.setCard(value);
    //     // this.backendService.emitCard();
    //     for (const card of this.cards) {
    //       if (card.effort) {
    //         globalEffort += card.effort;
    //       }
    //     }
    //     for (let i = 0; i <= duration; i++) {
    //       this.barChartLabels.push(i);
    //       leadingCoeff = -(globalEffort / duration) * i + globalEffort;
    //       idealLine.push(leadingCoeff);
    //     }
    //     this.barChartData.push({ data: idealLine, label: 'Ideal' });
    //     this.dataToDisplay = this.formatData(this.cards, duration);
    //     // this.barChartData.push({ data: this.dataToDisplay, label: 'Current', borderColor: 'rgba(0, 204, 255,1)', backgroundColor: 'rgba(0, 204, 255,0.4)', pointHoverBorderColor: 'rgba(0, 204, 255,0.8)', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff' });
    //     this.barChartData.push({ data: this.dataToDisplay, label: 'Current'});
    //     this.isChartReady = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  ngOnChanges(changes: SimpleChanges): void {
    let globalEffort = 0;
    let leadingCoeff: number;
    const idealLine: number[] = [];
    const date = new Date(Date.now());
    const dateMoment = moment(date, 'DD/MM/YYYY');
    const beggingDate = moment(this.selectedSprint.start_date, 'YYYY-MM-DD');
    const endDate = moment(this.selectedSprint.end_date, 'YYYY-MM-DD');
    const duration = endDate.diff(beggingDate, 'days');
    const currentDay = endDate.diff(dateMoment, 'days') > 0 ? dateMoment.diff(beggingDate, 'days') : duration;
    this.backendService.getTrelloBoardCardEffort(this.user, this.selectedSprint.sprint_number, currentDay).pipe(share()).subscribe(
      (value: TrelloCard[]) => {
        this.cards = value;
        // this.backendService.setCard(value);
        // this.backendService.emitCard();
        for (const card of this.cards) {
          if (card.effort) {
            globalEffort += card.effort;
          }
        }
        for (let i = 0; i <= duration; i++) {
          this.barChartLabels.push(i);
          leadingCoeff = -(globalEffort / duration) * i + globalEffort;
          idealLine.push(leadingCoeff);
        }
        this.barChartData.push({ data: idealLine, label: 'Ideal' });
        this.dataToDisplay = this.formatData(this.cards, duration);
        // this.barChartData.push({ data: this.dataToDisplay, label: 'Current', borderColor: 'rgba(0, 204, 255,1)', backgroundColor: 'rgba(0, 204, 255,0.4)', pointHoverBorderColor: 'rgba(0, 204, 255,0.8)', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff' });
        this.barChartData.push({ data: this.dataToDisplay, label: 'Current'});
        this.isChartReady = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
    // this.cardSubscription.unsubscribe();
  }

  formatData(cardToFormat: TrelloCard[], duration: number): number[] {
    let finalArray: number[] = [];
    let shouldBeskipped = false;
    for (const card of cardToFormat) {
      const tempArray: number[] = [];
      if (!shouldBeskipped) {
        for (let i = 0; i <= duration; i++) {
          let hasBeenUpdated = false;
          if (!card.cardtracking?.length) {
            if (card.effort) {
              tempArray.push(card.effort);
              continue;
            } else {
              shouldBeskipped = true;
              break;
            }
          }
          for (const cardTracking of card.cardtracking) {
            if (cardTracking.day_of_sprint === i) {
              tempArray.push(cardTracking.effort_remaining);
              hasBeenUpdated = true;
              break;
            }
          }
          if (tempArray.length > 0 && !hasBeenUpdated) {
            const lastcardTracking = tempArray.pop();
            tempArray.push(lastcardTracking, lastcardTracking);
          } else if (tempArray.length === 0) {
            tempArray.push(card.effort);
          }
        }
        if (!shouldBeskipped) {
          if (finalArray.length > 0) {
            finalArray = finalArray.map((num, idx) => {
              return num + tempArray[idx];
            });
          } else {
            finalArray = tempArray.slice();
          }
        } else {
          shouldBeskipped = false;
        }
      }
    }
    return finalArray;
  }
}
