import { MainHeaderModule } from './../../components/main-header/main-header.module';
import { FooterModule } from './../../components/footer/footer.module';
// import { HeaderModule } from './../../components/modules/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDetailPageRoutingModule } from './page-detail-routing.module';

import { PageDetailPage } from './page-detail.page';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    PipesModule,
    PageDetailPageRoutingModule
  ],
  declarations: [PageDetailPage]
})
export class PageDetailPageModule {}
