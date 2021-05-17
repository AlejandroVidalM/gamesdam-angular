import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.interface';
import { Game } from 'src/app/models/game.interface';
import { CategoryService } from 'src/app/services/category.service';
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
  categoryList = [];
  category: Category = undefined;
  constructor(private gameService : GameService, private categoryService : CategoryService) { }
  findCategoryById(id: string): Category{
    let categoryFinded: Category = undefined;
    for (var category of this.categoryList){
      
        console.log(id);
        console.log(category.id);
        if(category.id == id){
          categoryFinded = category;
        }
    }
    
    return categoryFinded;
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(resp => {
      this.categoryList = resp.map(e => {
        let category = e.payload.doc.data() as Category;
        category.id = e.payload.doc.id;
        return category;
      });
    });
    
    this.gameService.getGames().subscribe(resp => {
      this.gameList = resp.map(e => {
        let game = e.payload.doc.data() as Game;
        game.uid = e.payload.doc.id;
     
        return game;
      });
    });
  }

}
