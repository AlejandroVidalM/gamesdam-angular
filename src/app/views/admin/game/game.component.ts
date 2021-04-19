import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.interface';
import { GamesService } from 'src/app/services/games.service'
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  @Input() title;

  gameList = [];
  constructor(private gamesService : GamesService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(resp => {
      this.gameList = resp.map(e => {
        return e.payload.doc.data() as Game;
      });
    });
  }

}
