import { YoutubeComponent } from './youtube/youtube.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ColorPickerModule} from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductComponent,
    YoutubeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ColorPickerModule,
    DropdownModule,
  ],
  exports: [
    ProductComponent,
    YoutubeComponent
  ]
})
export class ComponentsModule { }
