import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariationStepComponent } from './variation-step.component';
import { VariationFormModule } from '../variation-form/variation-form.module';
import { VariationListModule } from '../variation-list/variation-list.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [
    VariationStepComponent
  ],
  imports: [
    CommonModule,
    VariationFormModule,
    VariationListModule,
    NzButtonModule,
    NzModalModule
  ],
  exports: [
    VariationStepComponent
  ],
})
export class VariationStepModule { }
