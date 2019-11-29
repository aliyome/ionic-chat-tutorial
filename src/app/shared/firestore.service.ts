import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { first } from 'rxjs/operators';

export interface User {
  displayName: string;
  photoDataUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  userDoc: AngularFirestoreDocument<User>;

  constructor(private readonly af: AngularFirestore) {}

  userInit(uid: string) {
    this.userDoc = this.af.doc<User>('users/' + uid);
    return this.userDoc
      .valueChanges()
      .pipe(first())
      .toPromise(Promise);
  }

  userSet(user: User): Promise<void> {
    return this.userDoc.set(user);
  }
}
