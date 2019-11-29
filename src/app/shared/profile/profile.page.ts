import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins, CameraResultType } from '@capacitor/core';
import { User, FirestoreService } from '../firestore.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid: string;
  user: User = {
    displayName: null,
    photoDataUrl: null,
  };
  photo: string;

  constructor(
    private readonly modalController: ModalController,
    private readonly auth: AuthService,
    private readonly firestore: FirestoreService,
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.uid = this.auth.getUserId();
    const user = await this.firestore.userInit(this.uid);
    if (user) {
      this.user = user;
    }
  }

  async updateProfile() {
    if (this.photo) {
      this.user.photoDataUrl = this.photo;
    }
    await this.firestore.userSet(this.user);
    this.modalController.dismiss();
  }

  modalDismiss() {
    this.modalController.dismiss();
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
    });
    this.photo = image && image.dataUrl;
  }
}
