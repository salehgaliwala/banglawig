import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAttributeRoutingModule } from './add-attribute-routing.module';
import { AddAttributeComponent } from './add-attribute.component';
import { FormBuilderModule } from 'src/app/components/form-builder/form-builder.module';


@NgModule({
  declarations: [
    AddAttributeComponent
  ],
  imports: [
    CommonModule,
    FormBuilderModule,
    AddAttributeRoutingModule
  ]
})
export class AddAttributeModule { }
