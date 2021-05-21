import { Injectable, Injector } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
      private injector:Injector,
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
   }

   async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    localStorage.setItem('token', (credential.credential as any).idToken);
    this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      password: user.password? user.password : '',
      active: true
    }

    userRef.set(data, { merge: true });
    this.router.navigate(['/admin']);
  }
  // private signInWithEmailPassword(email, password) {
  //   // [START auth_signin_password]
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       var user = userCredential.user;
        
  //     this.router.navigate(['/admin/games']);
  //       // ...
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     });
  //   // [END auth_signin_password]
  // }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const jwtHelper = this.injector.get(JwtHelperService);
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  loginWithEmail(email: string, password: string) {
    
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in
      
      const idToken = await userCredential.user.getIdTokenResult();
      localStorage.setItem('token', idToken.token);
      this.router.navigate(['/admin/games']);
      // ...
    })
    .catch((error) => {
      
    debugger;
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  registerWithEmailAndPassword(email, password){
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in 
      this.loginWithEmail(email, password);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  }
  getCurrentUser(){
    return this.afAuth.currentUser;
    
  }

  
}
