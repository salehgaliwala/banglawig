import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {ReturnPolicyBanglaPageRoutingModule } from './return-policy-bangla-routing.module';

import { ReturnPolicyBanglaPage } from './return-policy-bangla.page';
import { MainHeaderModule } from 'src/app/components/main-header/main-header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    ReturnPolicyBanglaPageRoutingModule
  ],
  declarations: [ReturnPolicyBanglaPage]
})
export class ReturnPolicyBanglaPageModule {}
