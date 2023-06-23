import { LoginModule } from './../components/modules/login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { ComponentsModule } from '../components/components.module';
import { MainHeaderModule } from '../components/main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    LoginModule,
    AccountPageRoutingModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
