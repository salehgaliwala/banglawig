import { OrderVideoModule } from './../components/video/order-video/order-video.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {DropdownModule} from 'primeng/dropdown';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { MainHeaderModule } from '../components/main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropdownModule,
    ReactiveFormsModule,
    MainHeaderModule,
    OrderVideoModule,
    CheckoutPageRoutingModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
