import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageUploaderComponent } from './image-uploader.component';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    NzMessageModule,
    NzModalModule
  ],
  exports: [
    ImageUploaderComponent
  ]
})
export class ImageUploaderModule { }
