import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore, private router: Router) { }
  getGames() {
    return this.firestore.collection('games').snapshotChanges();
  }
  updateGame(game: Game){
    const gameRef: AngularFirestoreDocument<any> = this.firestore.doc(`games/${game.uid}`);
    gameRef.set(game, {merge: true})
    this.router.navigate(['/games']);
  }
}
