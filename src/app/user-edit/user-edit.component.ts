import { UserLoginInfoImpl } from './../models/UserLoginInfoImpl.model';
import { UserLoginInfo, PersonneEntity } from './../interfaces/user-login-infos';
import { Subscription } from 'rxjs';
import { User } from './../models/User.models';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  userEditForm: FormGroup;
  user: UserLoginInfo;
  userSubscription: Subscription;
  newUser = {} as UserLoginInfo;
  newPersonne = {} as PersonneEntity;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: UserLoginInfo) => {
        this.user = user;
      }
    );
    this.userService.emitUser();
    this.initForm();
  }

  initForm() {
    this.userEditForm = this.formBuilder.group(
      {
        firstName: [this.user.first_name, [Validators.required]],
        lastName: [this.user.last_name, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]],
        userName: [this.user.username, [Validators.required]]
      }
    );
  }
  onSubmitForm() {
    const formValue = this.userEditForm.value;
    this.newPersonne = {
      has_random_password: this.user.personne[0].has_random_password,
      id: this.user.personne[0].id,
      slug: this.user.personne[0].slug,
      trello_id: this.user.personne[0].trello_id,
      user_infos: this.user.personne[0].user_infos,
      organizations: this.user.personne[0].organizations

    };

    this.newUser = {
      id: this.user.id,
      first_name: formValue['firstName'],
      last_name: formValue['lastName'],
      email: formValue['email'],
      username: formValue['userName'],
      is_authenticated: this.user.is_authenticated,
      personne: [this.newPersonne],
      is_active: this.user.is_active
    };

    this.userService.setUser(this.newUser);
    this.userService.emitUser();
    this.router.navigate(['/profile']);
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }

}
