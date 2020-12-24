import { LoadUserLogoutAction } from './../state-management/actions';
import { AppState } from './../state-management/app-state.model';
import { Store } from '@ngrx/store';
import { gsap } from 'gsap';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as fromAppState from '../state-management/app-state.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth$: Observable<boolean>;
  tl = gsap.timeline({ defaults: { ease: 'power2.Out' } });

  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromAppState.auth);
    this.createTimeline();
  }

  onLogout() {
    this.store.dispatch(new LoadUserLogoutAction());
  }

  createTimeline() {
    this.tl
      .to('.navbar-nav', 0.6, {
        display: 'flex',
        scaleY: 1,
        onReverseComplete: () => {
          gsap.set('.navbar-nav', { clearProps: 'all' });
        },
      })
      .to(
        '.nav-item',
        0.1,
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          onReverseComplete: () => {
            gsap.set('.nav-item', { clearProps: 'all' });
          },
        },
        '+=.15'
      );
    this.tl.reverse();
    this.tl.pause();
  }
  onMenuClick() {
    this.tl.reversed() ? this.tl.play() : this.tl.reverse();
  }
}
