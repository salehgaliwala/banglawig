import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';
import { AttributesComponent } from './attributes.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormBuilderModule } from 'src/app/components/form-builder/form-builder.module';


@NgModule({
  declarations: [
    AttributesComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzBadgeModule,
    NzDividerModule,
    NzAffixModule,
    NzIconModule,
    NzModalModule,
    FormBuilderModule,
    AttributesRoutingModule
  ]
})
export class AttributesModule { }
