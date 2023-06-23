import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DisplayProductsComponent } from './display-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [DisplayProductsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    DropdownModule,
    PanelMenuModule,
    RippleModule,
    InputTextModule,
    DialogModule
  ],
  exports: [DisplayProductsComponent]
})
export class DisplayProductsModule { }
