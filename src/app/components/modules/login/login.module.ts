import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { VerifyOtpComponent } from '../../verify-otp/verify-otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { SignupComponent } from '../../signup/signup.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyOtpComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    VerifyOtpComponent
  ]
})
export class LoginModule { }
