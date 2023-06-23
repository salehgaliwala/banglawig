import { HeaderModule } from './../components/modules/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {PanelMenuModule} from 'primeng/panelmenu';
import {SlideMenuModule} from 'primeng/slidemenu';

import { ComponentsModule } from '../components/components.module';

import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryPage } from './category.page';
import { MainHeaderModule } from '../components/main-header/main-header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    MainHeaderModule,
    PanelMenuModule,
    SlideMenuModule,
    CategoryPageRoutingModule
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
