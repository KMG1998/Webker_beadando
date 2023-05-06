import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserData } from '../model/UserData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  collectionName = 'UserData';
  constructor(private afs: AngularFirestore) {}

  create(user: UserData) {
    return this.afs.collection<UserData>(this.collectionName).doc().set(user);
  }

  getAll() {
    return this.afs.collection<UserData>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs
      .collection<UserData>(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  update(user: UserData) {
    return this.afs.collection<UserData>(this.collectionName).doc().set(user);
  }

  delete(id: string) {
    return this.afs.collection<UserData>(this.collectionName).doc(id).delete();
  }
}
