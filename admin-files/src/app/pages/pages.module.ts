import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthModule } from './auth/auth.module';
import { IconsProviderModule } from '../icons-provider.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PagesComponent,  
  
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    AuthModule,
    IconsProviderModule,
    RouterModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
