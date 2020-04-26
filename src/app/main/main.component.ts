import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AuthRoutes } from '../../auth/auth.routes';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent {

  public readonly signinPath = AuthRoutes.SIGNIN;
  public readonly signupPath = AuthRoutes.SIGNUP;
  public get isLogged() {
    return this.auth.isLoggedIn;
  }
  constructor(private auth: AuthService) {
  }
}
