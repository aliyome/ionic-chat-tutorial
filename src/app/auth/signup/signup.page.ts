import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Auth } from '../auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  login: Auth = { email: null, password: null };
  loading = false;

  constructor(private readonly auth: AuthService) {}

  ngOnInit() {}

  signUp() {
    this.loading = true;
    this.auth.authSignUp(this.login).finally(() => {
      this.loading = false;
    });
  }
}
