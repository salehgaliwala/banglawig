import { MainHeaderModule } from './../components/main-header/main-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { FooterModule } from '../components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    FooterModule,
    OrdersPageRoutingModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
