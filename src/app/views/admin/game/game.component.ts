import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.interface';
import { GameService } from 'src/app/services/game.service';
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
  constructor(private gameService : GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(resp => {
      this.gameList = resp.map(e => {
        return e.payload.doc.data() as Game;
      });
    });
  }

}
