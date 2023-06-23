import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsPageRoutingModule } from './terms-and-conditions-routing.module';

import { TermsAndConditionsPage } from './terms-and-conditions.page';
import { MainHeaderModule } from 'src/app/components/main-header/main-header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    TermsAndConditionsPageRoutingModule
  ],
  declarations: [TermsAndConditionsPage]
})
export class TermsAndConditionsPageModule {}
