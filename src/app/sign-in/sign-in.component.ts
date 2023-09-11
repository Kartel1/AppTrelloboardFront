import { LoadUserLoginAction } from './../state-management/actions';
import { AppState } from './../state-management/app-state.model';
import { Store } from '@ngrx/store';
import { TimelineMax, Back } from 'gsap';
import { AuthModel } from './../models/Auth.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  Directive,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  @Directive({ selector: 'body' })
  signInForm: FormGroup;
  auth: AuthModel;
  showModal = false;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  mql = window.matchMedia('(min-width: 700px)');
  /* mql2 = window.matchMedia('(min-width: 1024px)');
  mqlList: MediaQueryList[] = [this.mql, this.mql2]; */
  tl = new TimelineMax({ defaults: { duration: 1.5, opacity: 0 } });

  constructor(
    private formbuilder: FormBuilder,
    private renderer: Renderer2,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.intro(this.mql);
  }

  initForm(): void {
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,9}/)],
      ],
    });
    console.log(this.signInForm.controls);
  }
  onSubmitForm() {
    const formValue = this.signInForm.value;
    const email = 'email';
    const password = 'password';
    this.auth = new AuthModel(formValue[email], formValue[password], false);
    this.modalToggle();
    this.store.dispatch(new LoadUserLoginAction(this.auth));
  }

  ngOnDestroy() {}

  show() {
    this.modalToggle();
  }

  hide() {
    this.modalToggle();
  }
  intro(mqlList: MediaQueryList) {
    if (mqlList.matches) {
      this.tl.clear();
      this.tl
        // .set('#cloud-l', { clearProps: 'all' })
        .to('#cloud-l', 2, {
          opacity: 1,
          translateX: -200 /* ease: Back.easeInOut */,
        })
        .to('#cloud-r', 2, { opacity: 1, translateX: 190 }, '-=2')
        .to(
          '#trophy',
          2,
          { opacity: 1, transformOrigin: 'center', translateX: 20 },
          '-=2'
        )
        .to('#wind-l', 2, { opacity: 1, translateX: -170 }, '-=2')
        .to('#wind-r', 2, { opacity: 1, translateX: 400 }, '-=2');
    } /* else if (mqlList[1].matches) {
      this.tl.clear();
      this.tl
        // .set('#cloud-l', { clearProps: 'all' })
        .to('#cloud-l', 2, {
          opacity: 1,
          translateX: -200 , ease: Back.easeInOut,
        })
        .to('#cloud-r', 2, { opacity: 1, translateX: 190 }, '-=2')
        .to(
          '#trophy',
          2,
          { opacity: 1, transformOrigin: 'center', translateX: 20 },
          '-=2'
        )
        .to('#wind-l', 2, { opacity: 1, translateX: -120 }, '-=2')
        .to('#wind-r', 2, { opacity: 1, translateX: 400 }, '-=2');
    } */ else {
      this.tl
        .clear()
        .to('#cloud-l', 2, {
          opacity: 1,
          translateX: -70 /* ease: Back.easeInOut */,
        })
        .to('#cloud-r', 2, { opacity: 1, translateX: 90 }, '-=2')
        .to(
          '#trophy',
          2,
          { opacity: 2, transformOrigin: 'center', translateX: 35 },
          '-=2'
        )
        .to('#wind-l', 2, { opacity: 1, translateX: -65 }, '-=2')
        .to('#wind-r', 2, { opacity: 1, translateX: 150 }, '-=2');
    }
  }

  modalToggle() {
    this.showModal
      ? this.renderer.removeClass(document.body, 'modal-open')
      : this.renderer.addClass(document.body, 'modal-open');
    this.showModal = !this.showModal;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.tl.set('symbol', { clearProps: 'all' });
    this.intro(this.mql);
  }
}
