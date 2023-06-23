import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    IndexComponent,
    ViewComponent,
    CreateComponent,
    EditComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReviewModule { }
