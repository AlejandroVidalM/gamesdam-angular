import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent implements OnInit {

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
  constructor(private gameService: GameService) { }



  onSubmit() {
  }

  ngOnInit(): void {
  }

}
