import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariationListComponent } from './variation-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    VariationListComponent
  ],
  imports: [
    CommonModule,
    NzListModule,
    NzButtonModule
  ],
  exports: [
    VariationListComponent
  ]
})
export class VariationListModule { }
