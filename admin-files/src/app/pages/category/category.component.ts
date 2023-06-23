import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryAllSub!: Subscription;
  categoryAll!: Category[];
  categoriesCount!: number;

  isModalOpen = false;

  selectedCat!: Category;

  addCategoryForm!: FormGroup;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initCategory()
  }

  intiForm() {
    this.addCategoryForm = new FormGroup({
      title: new FormControl(this.selectedCat.title, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(250)]
      }),
      description: new FormControl(this.selectedCat.description, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(2000)]
      }),
      parentId: new FormControl(this.selectedCat.parentId, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  initCategory() {
    this.categoryAllSub = this.categoryService.categoryAll.subscribe(res => this.categoryAll = res);
    this.categoryService.fetchAll().subscribe(catRes => this.categoriesCount = catRes.result.count);
  }

  editCategory(index: number) {
    this.selectedCat = this.categoryAll[index];
    this.isModalOpen = true;
    this.intiForm();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateCategory(){
    if(!this.addCategoryForm.valid) return;
    this.categoryService.update( this.selectedCat.id, this.addCategoryForm.value).subscribe(()=> this.isModalOpen = false);
  }


}
