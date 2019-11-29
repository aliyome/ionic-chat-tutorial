import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Auth } from '../auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  login: Auth = { email: null, password: null };

  constructor(private readonly auth: AuthService) {}

  ngOnInit() {}

  signIn() {
    this.auth.authSignIn(this.login);
  }
}
