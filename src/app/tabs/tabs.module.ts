
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HeaderModule } from '../components/modules/header/header.module';

// import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
