import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { MainHeaderModule } from 'src/app/components/main-header/main-header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    GalleryPageRoutingModule
  ],
  declarations: [GalleryPage]
})
export class GalleryPageModule {}
