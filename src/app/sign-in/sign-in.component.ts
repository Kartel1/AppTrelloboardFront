import { UserLoginInfo } from './../interfaces/user-login-infos';
import { AuthModel } from './../models/Auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { pipe, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  userSubscription: Subscription;
  authSubscription: Subscription
  user: UserLoginInfo;
  auth: AuthModel;
  isAuth: boolean;
  constructor(private formbuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

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
  }

  initForm(): void{
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,9}/)]]
    });
  }
  onSubmitForm(){
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
    );;
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
