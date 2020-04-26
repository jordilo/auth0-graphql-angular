import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { samePassword } from './validators';

const pswStrength = /^(?:([A-Z])*([a-z])*(\d)*(\W)*){8,12}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './auth.signup.component.html'
})
export class AuthSignupComponent implements OnInit {

  public signupForm: FormGroup;
  public error: string;
  public get isSamePassword(): boolean {
    return this.signupForm.get('passwordRepeat').errors !== null;
  }
  public get isEmailEmpty(): boolean {
    const emailCtrl = this.signupForm.get('email');
    return emailCtrl.errors !== null && emailCtrl.errors.required !== undefined && emailCtrl.dirty;
  }
  public get isEmailInvalid(): boolean {
    const emailCtrl = this.signupForm.get('email');
    return emailCtrl.errors !== null && emailCtrl.errors.email !== undefined && emailCtrl.dirty;
  }
  public get isPasswordValid(): boolean {
    const emailCtrl = this.signupForm.get('password');
    return emailCtrl.errors !== null && emailCtrl.errors.pattern !== undefined && emailCtrl.dirty;
  }
  constructor(private fb: FormBuilder, private auth: AuthService) { }

  public ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['jordi@jordi.net', [Validators.required, Validators.email]],
      password: ['Jordania(4', [Validators.required, Validators.pattern(pswStrength), samePassword('passwordRepeat')]],
      passwordRepeat: ['Jordania(4', samePassword('password')],
    });
  }

  public sendForm() {
    this.error = '';
    const { email, password } = this.signupForm.value;
    this.signupForm.disable();
    this.auth.singup(email, password)
      .pipe(
        map(() => this.auth.login(email, password).subscribe()),
        catchError((error) => {
          this.error = error.description;
          this.signupForm.enable();
          return NEVER;
        }),
      )
      .subscribe();
  }
}
