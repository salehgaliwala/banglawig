import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;

  defaultGender = 'female';

  constructor() { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change'
      }),
      email: new FormControl(null,{
        updateOn: 'change',
        validators: [Validators.email]
      }),
      birthDate: new FormControl(null, {
        updateOn: 'change'
      }),
      gender: new FormControl(this.defaultGender, {
        updateOn: 'change'
      })
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
  }

}
