import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore, private router: Router) { }


  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  
  updateUser(user: User){
    if(!user.uid) {
      user.uid = uuid.v4();
    }
    if(!user.photoURL){
      user.photoURL="https://robohash.org/test"+user.email;
    }
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    
    userRef.set(user, {merge: true})
  }
}
