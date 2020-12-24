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

  constructor(
    private formbuilder: FormBuilder,
    private renderer: Renderer2,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.intro();
  }

  initForm(): void {
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,9}/)],
      ],
    });
  }
  onSubmitForm() {
    const formValue = this.signInForm.value;
    const email = 'email';
    const password = 'password';
    this.auth = new AuthModel(formValue[email], formValue[password], false);
    this.store.dispatch(new LoadUserLoginAction(this.auth));
  }

  ngOnDestroy() {}

  show() {
    this.showModal = true;
    this.renderer.addClass(document.body, 'modal-open');
  }

  hide() {
    this.showModal = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }
  intro() {
    const tl = new TimelineMax({ defaults: { duration: 1.5, opacity: 0 } });
    tl.to('#cloud-left', 2, {
      opacity: 1,
      translateX: -70 /* ease: Back.easeInOut */,
    })
      .to('#cloud-right', 2, { opacity: 1, translateX: 140 }, '-=2')
      .to(
        'path#award-draw',
        2,
        { opacity: 1, transformOrigin: 'center', translateX: -60 },
        '-=2'
      )
      .to('#icon-43-wind', 2, { opacity: 1, translateX: -70 }, '-=2')
      .to('#icon-43-wind-2', 2, { opacity: 1, translateX: 160 }, '-=2');
  }
}
