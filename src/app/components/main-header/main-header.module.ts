import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { HeaderModule } from '../modules/header/header.module';



@NgModule({
  declarations: [MainHeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule
  ],
  exports: [MainHeaderComponent]
})
export class MainHeaderModule { }
