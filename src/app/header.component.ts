
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AuthUser } from '../auth/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  @Input() public title: string;
  @Input() public user: AuthUser;
  @Input() public isUserLogged: boolean;
  @Output() public logoutHandler: EventEmitter<any> = new EventEmitter();
  @Output() public loginHandler: EventEmitter<any> = new EventEmitter();

  public logout() {
    this.logoutHandler.emit();
  }
  public login() {
    this.loginHandler.emit();
  }
}
