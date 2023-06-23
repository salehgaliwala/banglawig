import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    ClaimsComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzPaginationModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    ClaimsRoutingModule
  ]
})
export class ClaimsModule { }
