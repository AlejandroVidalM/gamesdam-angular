import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent implements OnInit {

  game: Game = undefined;
  gameId = undefined;
  newGameForm = new FormGroup({
    name: new FormControl(''),
    developer: new FormControl(''),
    rating: new FormControl(''),
    year: new FormControl(''),
    steam: new FormControl(''),
    ps5: new FormControl(''),
    xboxX: new FormControl(''),
    nintendoSwitch: new FormControl(''),
  });
  constructor(private gameService: GameService, private route: ActivatedRoute) { }



  onSubmit() {

    let objectGame: Game = {
      uid: this.gameId
    } as any;
    Object.keys(this.newGameForm.controls).map(key => {
      objectGame[key] = this.newGameForm.controls[key].value;
    });

    this.gameService.updateGame(objectGame);
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if(this.gameId) {
      this.gameService.getGame(this.gameId).subscribe(resp => {
        this.game = resp;

        Object.keys(this.newGameForm.controls).forEach(keyElemento => {
          this.newGameForm.controls[keyElemento].setValue(resp[keyElemento]);
        });

        console.log("Editando " + this.game);
      });
    }
  }

}
