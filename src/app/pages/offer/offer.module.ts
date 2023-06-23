import { MainHeaderModule } from './../../components/main-header/main-header.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './../../components/modules/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { OfferPageRoutingModule } from './offer-routing.module';

import { OfferPage } from './offer.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    MainHeaderModule,
    HeaderModule,
    OfferPageRoutingModule
  ],
  declarations: [OfferPage]
})
export class OfferPageModule {}
