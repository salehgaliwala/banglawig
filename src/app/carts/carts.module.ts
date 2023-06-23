import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {DividerModule} from 'primeng/divider';

import { CartsPageRoutingModule } from './carts-routing.module';

import { CartsPage } from './carts.page';
import { MainHeaderModule } from '../components/main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DividerModule,
    MainHeaderModule,
    CartsPageRoutingModule
  ],
  declarations: [CartsPage]
})
export class CartsPageModule {}
