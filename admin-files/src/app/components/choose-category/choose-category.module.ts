import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseCategoryComponent } from './choose-category.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    ChooseCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCascaderModule,
    NzButtonModule,
    NzCheckboxModule
  ],
  exports: [
    ChooseCategoryComponent
  ]
})
export class ChooseCategoryModule { }
