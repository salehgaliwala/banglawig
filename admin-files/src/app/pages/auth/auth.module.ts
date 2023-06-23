import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AuthRoutingModule } from './auth-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzMessageModule,
    NzLayoutModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
