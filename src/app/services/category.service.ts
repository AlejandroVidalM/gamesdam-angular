import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private firestore: AngularFirestore, private router: Router) { }
  getCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }
  getCategory(id:string){
    return this.firestore.doc<Category>(`categories/${id}`).valueChanges();
  }
  
  updateCategory(category: Category){
    if(!category.id) {
      category.id = uuid.v4();
    }
    const categoryRef: AngularFirestoreDocument<Category> = this.firestore.doc(`categories/${category.id}`);
    
    categoryRef.set(category, {merge: true})
    this.router.navigate(['/admin/categories']);
  }
}
