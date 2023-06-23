import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilderModule } from 'src/app/components/form-builder/form-builder.module';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzResultModule,
    NzButtonModule,
    FormBuilderModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
