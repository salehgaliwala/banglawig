import { SearchResultsComponent } from './../../search-results/search-results.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchResultsComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SearchResultsComponent
  ]
})
export class HeaderModule { }
