import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzAvatarModule,
    NzIconModule,
    NzSpinModule,
    NzInputModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
