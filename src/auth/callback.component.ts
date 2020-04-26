
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.template.html',
})

export class CallbackComponent implements OnInit {

  constructor(private aut0: AuthService) { }
  public ngOnInit() {
    this.aut0.handleLoginCallback();
  }
}
