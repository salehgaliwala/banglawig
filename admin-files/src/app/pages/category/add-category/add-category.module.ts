import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    AddCategoryRoutingModule
  ]
})
export class AddCategoryModule { }
