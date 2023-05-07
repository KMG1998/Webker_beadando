import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Statement} from "../model/Statement";
import {getAll} from "@angular/fire/remote-config";

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  collectionName = 'Statements';

  constructor(private afs:AngularFirestore) { }

  create(stmt: Statement) {
    return this.afs.collection<Statement>(this.collectionName).doc().set(stmt);
  }

  getAll(uid:string){
    return this.afs.collection<Statement>(this.collectionName,ref => ref.where('userid','==',uid).orderBy('timestamp','desc')).get();
  }

  getWithLimit(uid:string,limit:number){
    return this.afs.collection<Statement>(this.collectionName,ref =>
      ref.where('userid','==',uid).limit(limit).orderBy('timestamp','desc')).get();
  }

  getById(id: string) {
    return this.afs
      .collection<Statement>(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  update(id:string,stmt: Statement) {
    return this.afs.collection<Statement>(this.collectionName).doc(id).set(stmt);
  }

  delete(id: string) {
    return this.afs.collection<Statement>(this.collectionName).doc(id).delete();
  }
}
