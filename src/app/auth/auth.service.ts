import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly navController: NavController,
  ) {}

  authSignUp(login: Auth) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch(error => {
        throw error;
      });
  }

  authSignIn(login: Auth) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch(error => {
        throw error;
      });
  }

  authSignOut() {
    return this.afAuth.auth
      .signOut()
      .then(() => this.navController.navigateRoot('/auth/signin'))
      .catch(error => {
        throw error;
      });
  }
}
