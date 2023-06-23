import { IonicModule } from '@ionic/angular';
import { OrderVideoComponent } from './order-video.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [OrderVideoComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [OrderVideoComponent]
})
export class OrderVideoModule { }
