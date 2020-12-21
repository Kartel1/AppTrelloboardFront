import { TimelineMax, Back } from 'gsap';
import { UserLoginInfo } from './../interfaces/user-login-infos';
import { AuthModel } from './../models/Auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { pipe, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, HostBinding, Directive, Renderer2 } from '@angular/core';
import { share } from 'rxjs/operators';
import { left } from '@popperjs/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  // host: {'class': 'showModal'}
})

export class SignInComponent implements OnInit, OnDestroy {
@Directive({selector: 'body'})
  signInForm: FormGroup;
  userSubscription: Subscription;
  authSubscription: Subscription;
  user: UserLoginInfo;
  auth: AuthModel;
  isAuth: boolean;
  showModal = false;
  constructor(private formbuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private renderer: Renderer2) {
               }

  ngOnInit(): void {
    this.initForm();
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: UserLoginInfo) => {
        this.user = user;
      }
    );
    this.userService.emitUser();
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
    this.authService.emitAuthStatus();
    this.intro();
  }

  initForm(): void {
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,9}/)]]
    });
  }
  onSubmitForm() {
    const formValue = this.signInForm.value;
    const email = 'email';
    const password = 'password';
    this.auth = new AuthModel(formValue[email],
      formValue[password],
      false
    );
    this.authService.signIn(this.auth).pipe(share())
      .subscribe(
        (value: UserLoginInfo) => {
          this.user = value;
          this.isAuth = this.user.is_authenticated;
          sessionStorage.setItem('isAuth', JSON.stringify(this.isAuth));
          sessionStorage.setItem('user', JSON.stringify(this.user));
          this.userService.setUser(this.user);
          this.userService.emitUser();
          this.authService.setAuthSatus(this.isAuth);
          this.authService.emitAuthStatus();
          this.router.navigate(['home']);
        },
        (error) => {
          console.log('Erreur de connexion ' + error);
        }
      );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


  show() {
    this.showModal = true;
    this.renderer.addClass(document.body, 'modal-open')
  }

  hide() {
    this.showModal = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }
  intro() {
    const tl = new TimelineMax({ defaults: { duration: 1.5, opacity: 0 } });
    tl.to('#cloud-left', 2, { opacity: 1, translateX: -70, /* ease: Back.easeInOut */ })
      .to('#cloud-right', 2, { opacity: 1, translateX: 140 }, '-=2')
      .to('path#award-draw', 2, { opacity: 1, transformOrigin: 'center', translateX: -60 }, '-=2')
      .to('#icon-43-wind', 2, { opacity: 1, translateX: -70 }, '-=2')
      .to('#icon-43-wind-2', 2, { opacity: 1, translateX: 160 }, '-=2');
  }

}
