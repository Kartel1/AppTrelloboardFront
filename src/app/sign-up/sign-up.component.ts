import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private formbuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,9}/)],
      ],
    });
  }
  onSubmitForm() {}
}
