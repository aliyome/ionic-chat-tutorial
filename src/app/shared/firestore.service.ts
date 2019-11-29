import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { first, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  displayName: string;
  photoDataUrl: string;
}

export interface Message {
  uid: string;
  message: string;
  timestamp: number;
}

export interface Chat extends User, Message {}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  userDoc: AngularFirestoreDocument<User>;
  messageCollection: AngularFirestoreCollection<Message>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(private readonly af: AngularFirestore) {
    this.messageCollection = this.af.collection<Message>('chats', ref =>
      ref.orderBy('timestamp', 'desc'),
    );
    this.userCollection = this.af.collection<User>('users');
  }

  messageAdd(message: Message) {
    return this.messageCollection.add(message);
  }

  chatInit(): Observable<Chat[]> {
    return this.messageCollection.valueChanges({ idField: 'messageId' }).pipe(
      concatMap(async messages => {
        const users = await this.userCollection
          .valueChanges({ idField: 'uid' })
          .pipe(first())
          .toPromise(Promise);
        return messages.map(message => {
          const user = users.find(u => u.uid === message.uid);
          return { ...message, ...user };
        });
      }),
    );
  }

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
