import { AuthService } from './../../services/auth.service';
/* eslint-disable max-len */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  invalid = false;
  errorMessage = 'please fill up the fields correctly...';

  loginForm = new FormGroup({
    username: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    password: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    })
  });

  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {}

  onLogIn(){
    if(this.loginForm.valid) {
      this.invalid = false;
      console.log({signUp: this.loginForm.value});

      // TODO: login
      this.authService.logIn(this.loginForm.value).subscribe();

    } else {
      this.invalid = true;
    }
  }

}
