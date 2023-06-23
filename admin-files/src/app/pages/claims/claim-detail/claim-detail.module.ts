import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimDetailRoutingModule } from './claim-detail-routing.module';
import { ClaimDetailComponent } from './claim-detail.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveFormsModule } from '@angular/forms';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    ClaimDetailComponent
  ],
  imports: [
    CommonModule,
    NzSpinModule,
    NzResultModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzInputNumberModule,
    ReactiveFormsModule,
    ClaimDetailRoutingModule
  ]
})
export class ClaimDetailModule { }
