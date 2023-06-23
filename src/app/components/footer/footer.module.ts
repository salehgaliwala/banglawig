import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
