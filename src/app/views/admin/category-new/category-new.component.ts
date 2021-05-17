import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {
  
  category: Category = undefined;
  categoryId = undefined;
  newCategoryForm = new FormGroup({
    name: new FormControl(''),
    icon: new FormControl('')
  });
  icon = undefined;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }
  
  onSubmit() {

    let objectCategory: Category = {
      id: this.categoryId
    } as any;
    Object.keys(this.newCategoryForm.controls).map(key => {
      objectCategory[key] = this.newCategoryForm.controls[key].value;
    });

    this.categoryService.updateCategory(objectCategory);
  }
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if(this.categoryId) {
      this.categoryService.getCategory(this.categoryId).subscribe(resp => {
        this.category = resp;

        Object.keys(this.newCategoryForm.controls).forEach(keyElemento => {
          this.newCategoryForm.controls[keyElemento].setValue(resp[keyElemento]);
        });

      });
    }
  }


}
