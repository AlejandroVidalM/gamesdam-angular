import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game.interface';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore, private router: Router) { }
  getGames() {
    return this.firestore.collection('games').snapshotChanges();
  }
  updateGame(game: Game){
    if(!game.uid) {
      game.uid = uuid.v4();
    }
    const gameRef: AngularFirestoreDocument<Game> = this.firestore.doc(`games/${game.uid}`);
    
    gameRef.set(game, {merge: true})
    this.router.navigate(['/admin/games']);
  }
  
  getGame(id: string) {
    return this.firestore.doc<Game>(`games/${id}`).valueChanges();
  }
  
  deleteGame(id: string) {
    const gameRef: AngularFirestoreDocument<Game> = this.firestore.doc(`games/${id}`);
    gameRef.delete();
  }
}
