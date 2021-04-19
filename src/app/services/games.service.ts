import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private firestore: AngularFirestore) { }
  getGames() {
    return this.firestore.collection('games').snapshotChanges();
  }
}
