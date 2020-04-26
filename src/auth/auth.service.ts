import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthConfigService } from './auth-config.service';
import { AuthUser } from './auth';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { share, take } from 'rxjs/operators';

(window as any).global = window;
const EXPIRES_AT_KEY = 'expiresAt';
const TOKEN_KEY = 'accessToken';
const TOKEN_ID = 'idToken';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private auth0: auth0.WebAuth;
  public get user(): AuthUser {
    return this.userProfile;
  }

  public get user$(): Observable<AuthUser> {
    return this.onUserLoginSubject.pipe(share());
  }

  public get token$(): Observable<string> {
    return this.onTokenChangeSubject.pipe(share());
  }

  // Store authentication data
  public accessToken: string;
  private expiresAt: number;
  private authenticated: boolean;
  private userProfile: any;
  private onUserLoginSubject = new BehaviorSubject<AuthUser>(null);
  private onTokenChangeSubject = new BehaviorSubject<string>(null);

  constructor(private router: Router, private config: AuthConfigService) {
    this.auth0 = new auth0.WebAuth(this.config);

    this.expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY));
    this.accessToken = localStorage.getItem(TOKEN_KEY);
    this.authenticated = this.expiresAt > 0;
    this.renewSession();
  }

  public authorize() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  public login(username: string, password: string): Observable<any> {
    return new Observable((subscriber) => {
      const realm = 'Username-Password-Authentication';
      this.auth0.login({ username, password, realm }, (err, ok) => {
        if (ok !== undefined) {
          subscriber.next(ok.Id);
          return subscriber.complete();
        }
        subscriber.error(err);
      });
    });
  }

  public singup(email: string, password: string): Observable<any> {
    return new Observable((subscriber) => {
      this.auth0.signup({
        connection: 'Username-Password-Authentication',
        email,
        password,
      }, (err, ok) => {
        if (ok !== undefined) {
          subscriber.next(ok.Id);
          return subscriber.complete();
        }
        subscriber.error(err);
      });
    });
  }
  public changePassword(email: string): Observable<any> {
    return new Observable((subscriber) => {
      this.auth0.changePassword({
        connection: 'Username-Password-Authentication',
        email,
      }, (err, ok) => {
        console.log(err, ok);
        if (ok !== undefined) {
          subscriber.next(ok.Id);
          return subscriber.complete();
        }
        subscriber.error(err);
      });
    });
  }

  public handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  private renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  private getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSession(authResult, profile);
      }
    });
  }

  private setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    localStorage.setItem(EXPIRES_AT_KEY, this.expiresAt.toString());
    localStorage.setItem(TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(TOKEN_ID, authResult.idToken);
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
    console.log(authResult, profile);
    this.onUserLoginSubject.next(profile);
    this.onTokenChangeSubject.next(this.accessToken);
  }

  public logout() {
    localStorage.removeItem(EXPIRES_AT_KEY);
    localStorage.removeItem(TOKEN_KEY);
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.auth0.logout({
      returnTo: environment.auth.returnTo,
      clientID: environment.auth.clientID
    });
  }

  public get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  }
}
