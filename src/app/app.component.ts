import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/auth/auth';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {


  public appInfo = {
    name: environment.appName,
    version: environment.version
  };
  public get isUserLogged(): boolean {
    return this.auth.isLoggedIn;
  }
  public user$: Observable<AuthUser>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$.pipe(filter((user) => user !== null));
  }

  public logoutHandler() {
    this.auth.logout();
  }

  public loginHandler() {
    this.auth.authorize();
  }

}
