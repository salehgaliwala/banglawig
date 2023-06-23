import { MainHeaderModule } from './../../components/main-header/main-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitePageRoutingModule } from './invite-routing.module';

import { InvitePage } from './invite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainHeaderModule,
    InvitePageRoutingModule
  ],
  declarations: [InvitePage]
})
export class InvitePageModule {}
