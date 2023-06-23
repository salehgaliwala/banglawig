import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsBanglaPageRoutingModule } from './terms-and-conditions-bangla-routing.module';

import { TermsAndConditionsBanglaPage } from './terms-and-conditions-bangla.page';
import { MainHeaderModule } from 'src/app/components/main-header/main-header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    TermsAndConditionsBanglaPageRoutingModule
  ],
  declarations: [TermsAndConditionsBanglaPage]
})
export class TermsAndConditionsBanglaPageModule {}
