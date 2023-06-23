import { TextBannerModalComponent } from './text-banner-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TextBannerModalComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [TextBannerModalComponent]
})
export class TextBannerModalModule { }
