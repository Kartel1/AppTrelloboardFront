import { CardTracking } from './../interfaces/card-by-user';
import { UserService } from './../services/user.service';
import { BackendService } from './../services/backend.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { TrelloCard } from '../interfaces/card-by-user';
import { UserLoginInfo } from '../interfaces/user-login-infos';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

  user: UserLoginInfo;
  userSubscription: Subscription;
  cards: TrelloCard[];
  cardSubscription: Subscription;
  dataToDisplay: number[];

  constructor(private backendService: BackendService,
              private userService: UserService) {

   }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  duration = 30;
  globalEffort = 60;
  idealLine: number[] = new Array();
  date = new Date(Date.now());
  dateMoment =  moment(this.date, 'DD/MM/YYYY') ;
  beggingDate = moment('1/11/2020', 'DD/MM/YYYY');
  endDate = moment('30/11/2020', 'DD/MM/YYYY');
  testduration = this.endDate.diff( this.beggingDate, 'days');
  currentDay = this.dateMoment.diff(this.beggingDate, 'days');
  public barChartLabels = new Array();
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
   /*  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'} */
  ];

  ngOnInit(): void {

    this.userSubscription = this.userService.userSubject.subscribe(
      (user: UserLoginInfo) => {
        this.user = user;
      }
    );
    this.userService.emitUser();
    this.cardSubscription = this.backendService.cardSubject.subscribe(
      (cards: TrelloCard[]) => {
        this.cards = cards.slice();
      }
    );
    this.backendService.emitCard();
    for (let i = 0 ; i <= this.duration; i++){
      this.barChartLabels.push(i);
      const value  = -(this.globalEffort / this.duration) * i + this.globalEffort;
      this.idealLine.push(value);
    }
    this.barChartData.push( {data: this.idealLine, label: 'Series A'});
    this.backendService.getTrelloBoardCardEffort(this.user, 23, this.currentDay).subscribe(
      (value: TrelloCard[]) => {
          this.backendService.setCard(value);
          this.backendService.emitCard();
          this.dataToDisplay = this.formatData(this.cards);
          this.barChartData.push({data: this.dataToDisplay, label : 'Series B', borderColor: 'rgba(0, 204, 255,0.6)', backgroundColor : 'rgba(0, 204, 255,0.4)'});
          // this.barChartData.push({data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', borderColor: '#3e95cd'});
      },
      (error) => {
          console.log(error);
      }
      );
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.cardSubscription.unsubscribe();
  }

  formatData(cardToFormat: TrelloCard[]): number[] {
    let finalArray: number[] = [];
    let shouldBeskipped = false;
    for (const card of cardToFormat){
      const tempArray: number[] = [];
      if (!shouldBeskipped) {
        for (let i = 0; i <= this.duration; i++){
          let hasBeenUpdated = false;
          if (!card.cardtracking?.length){
            if (card.effort) {
              tempArray.push(card.effort);
              continue;
            }else{
              shouldBeskipped = true;
              break;
            }
          }
          for (const cardTracking of card.cardtracking){
            if (cardTracking.day_of_sprint === i) {
              tempArray.push(cardTracking.effort_remaining);
              hasBeenUpdated = true;
              break;
            }
          }
          if (tempArray.length > 0 && !hasBeenUpdated){
            const lastcardTracking = tempArray.pop();
            tempArray.push(lastcardTracking, lastcardTracking);
          }else if (tempArray.length === 0){
            tempArray.push(card.effort);
          }
        }
        if (!shouldBeskipped) {
          if (finalArray.length > 0) {
            finalArray = finalArray.map((num, idx) => {
              return num + tempArray[idx];
            });
          }else{
            finalArray = tempArray.slice();
          }
        }else{
          shouldBeskipped = false;
        }
      }
    }
    return finalArray;
  }

}
