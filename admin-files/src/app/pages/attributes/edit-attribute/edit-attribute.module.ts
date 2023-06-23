import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAttributeRoutingModule } from './edit-attribute-routing.module';
import { EditAttributeComponent } from './edit-attribute.component';
import { FormBuilderModule } from 'src/app/components/form-builder/form-builder.module';


@NgModule({
  declarations: [
    EditAttributeComponent
  ],
  imports: [
    CommonModule,
    FormBuilderModule,
    EditAttributeRoutingModule
  ]
})
export class EditAttributeModule { }
