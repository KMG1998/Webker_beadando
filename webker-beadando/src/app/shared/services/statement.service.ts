import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Statement} from "../model/Statement";

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  collectionName = 'Statements';

  constructor(private afs:AngularFirestore) { }

  create(stmt: Statement) {
    return this.afs.collection<Statement>(this.collectionName).doc().set(stmt);
  }

  getAll(){
    return this.afs.collection<Statement>(this.collectionName).get();
  }

  getWithLimit(limit:number){
    return this.afs.collection<Statement>(this.collectionName,ref =>
      ref.limit(limit)).get();
  }

  getById(id: string) {
    return this.afs
      .collection<Statement>(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  update(stmt: Statement) {
    return this.afs.collection<Statement>(this.collectionName).doc().set(stmt);
  }

  delete(id: string) {
    return this.afs.collection<Statement>(this.collectionName).doc(id).delete();
  }
}
