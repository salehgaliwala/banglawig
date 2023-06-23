import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {PrivacyPolicyBanglaPageRoutingModule } from './privacy-policy-bangla-routing.module';

import { PrivacyPolicyBanglaPage } from './privacy-policy-bangla.page';
import { MainHeaderModule } from 'src/app/components/main-header/main-header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    PrivacyPolicyBanglaPageRoutingModule
  ],
  declarations: [PrivacyPolicyBanglaPage]
})
export class PrivacyPolicyBanglaPageModule {}
