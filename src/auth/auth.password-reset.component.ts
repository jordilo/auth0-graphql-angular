import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthRoutes } from './auth.routes';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.password-reset.component.html'
})
export class AuthPasswordResetComponent implements OnInit {

  public pswResetForm: FormGroup;
  public error: string;

  public get isEmailEmpty(): boolean {
    const emailCtrl = this.pswResetForm.get('email');
    return emailCtrl.errors !== null && emailCtrl.errors.required !== undefined && emailCtrl.dirty;
  }
  public get isEmailValid(): boolean {
    const emailCtrl = this.pswResetForm.get('email');
    return emailCtrl.errors !== null && emailCtrl.errors.email !== undefined && emailCtrl.dirty;
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }

  public ngOnInit() {
    this.pswResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public sendForm() {
    this.error = undefined;
    const { email } = this.pswResetForm.value;
    this.pswResetForm.disable();
    this.auth.changePassword(email)
      .pipe(catchError((error) => {
        this.error = error.description;
        this.pswResetForm.enable();
        return NEVER;
      }))
      .subscribe(() => this.route.navigate([AuthRoutes.SIGNIN]));
  }
}
