import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly navController: NavController,
    private readonly alertController: AlertController,
  ) {}

  authSignUp(login: Auth) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch(error => {
        this._alertError(error);
        throw error;
      });
  }

  authSignIn(login: Auth) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch(error => {
        this._alertError(error);
        throw error;
      });
  }

  authSignOut() {
    return this.afAuth.auth
      .signOut()
      .then(() => this.navController.navigateRoot('/auth/signin'))
      .catch(error => {
        this._alertError(error);
        throw error;
      });
  }

  private async _alertError(error: any) {
    const alert = await this.alertController.create({
      header: error.code,
      message: error.message,
      buttons: ['閉じる'],
    });
    await alert.present();
  }
}
