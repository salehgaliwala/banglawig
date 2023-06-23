import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  addCategoryForm!: FormGroup;
  categoryNested!: Category[];
  categoryAll!: Category[];

  categoryAllSub!: Subscription;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.intiForm();
    this.initCategory();
  }

  intiForm() {
    this.addCategoryForm = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(250)]
      }),
      description: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(2000)]
      }),
      parentId: new FormControl(0, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  initCategory() {
    this.categoryAllSub = this.categoryService.categoryAll.subscribe(res => this.categoryAll = res);
    this.categoryService.fetchAll().subscribe();
  }

  addCategory(){
    if(!this.addCategoryForm.valid) return;
    this.categoryService.add(this.addCategoryForm.value).subscribe();
  }

  ngOnDestroy(): void {
    this.categoryAllSub.unsubscribe();
  }

}
