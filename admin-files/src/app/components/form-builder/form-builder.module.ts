import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploaderModule } from '../image-uploader/image-uploader.module';



@NgModule({
  declarations: [
    FormBuilderComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    ImageUploaderModule,
    ReactiveFormsModule
  ],
  exports: [
    FormBuilderComponent
  ]
})
export class FormBuilderModule { }
