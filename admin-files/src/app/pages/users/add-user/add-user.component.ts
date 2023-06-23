import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsersServiceService } from '../users-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup;

  constructor(
    private usersService: UsersServiceService,
    private loadingMessage: NzMessageService
  ) { }

  ngOnInit(): void {

    this.formInit();
  }

  formInit() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'change'
      }),
      lastName: new FormControl(null, {
        updateOn: 'change'
      }),
      username: new FormControl(null, {
        updateOn: 'change'
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'change'
      }),
      type: new FormControl('individual', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      roleId: new FormControl(2, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  addUser(){
    if(!this.addUserForm.value.username) this.addUserForm.patchValue({username: this.addUserForm.value.email});

    console.log(this.addUserForm.value);
    const id = this.loadingMessage.loading('creating user in progress..', { nzDuration: 0 }).messageId;
    this.usersService.addUser(this.addUserForm.value).subscribe(()=> {
      this.loadingMessage.remove(id);
      this.addUserForm.reset();
    });
  }

}
