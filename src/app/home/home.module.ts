import { DisplayProductsModule } from './../components/display-products/display-products.module';
import { MainHeaderModule } from './../components/main-header/main-header.module';
import { ChatButtonModule } from './../components/chat-button/chat-button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { FooterModule } from './../components/footer/footer.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DisplayProductsModule,
    MainHeaderModule,
    FooterModule,
    ChatButtonModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
