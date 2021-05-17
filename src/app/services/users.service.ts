import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  login() {
    this.router.navigate(['/admin/games']);
  }

  constructor(private firestore: AngularFirestore, private router: Router) { }
  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  
  updateUser(user: User){
    if(!user.uid) {
      user.uid = uuid.v4();
    }
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    
    userRef.set(user, {merge: true})
    this.router.navigate(['/auth/login']);
  }
}
