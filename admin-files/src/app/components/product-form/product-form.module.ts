import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploaderModule } from '../image-uploader/image-uploader.module';



@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ImageUploaderModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzInputNumberModule
  ],
  exports: [
    ProductFormComponent
  ]
})
export class ProductFormModule { }
