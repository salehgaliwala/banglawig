import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariationFormComponent } from './variation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ImageUploaderModule } from '../image-uploader/image-uploader.module';



@NgModule({
  declarations: [
    VariationFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    ImageUploaderModule,
    NzInputNumberModule,
  ],
  exports: [
    VariationFormComponent
  ]
})
export class VariationFormModule { }
