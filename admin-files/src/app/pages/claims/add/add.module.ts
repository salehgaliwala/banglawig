import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputNumberModule,
    ReactiveFormsModule,
    AddRoutingModule
  ]
})
export class AddModule { }
