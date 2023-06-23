import { AuthService } from './../../services/auth.service';
/* eslint-disable max-len */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() signUpSuccess = new EventEmitter<boolean>();
  errorMessage = 'please fill up all the fields';
  invalid = false;

  signUpForm = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'submit'
    }),
    username: new FormControl(null, {
      updateOn: 'submit'
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
      updateOn: 'submit'
    }),
    password: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'submit'
    })
  });

  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  onSignUp(){
    if(this.signUpForm.valid) {
      this.signUpForm.patchValue({username: this.signUpForm.value.email});
      this.invalid = false;
      console.log({signUp: this.signUpForm.value});

      // TODO: registration
      this.authService.signUp(this.signUpForm.value).subscribe(userRes => userRes.success ? this.signUpSuccess.emit(true) : this.signUpSuccess.emit(false));

      // this.signUpSuccess.emit(false);

    } else {
      this.invalid = true;
      this.signUpSuccess.emit(true);
    }
  }

}
