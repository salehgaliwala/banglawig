import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../users-service.service';
import { Users } from '../users.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  editUserForm!: FormGroup;
  singleUser?: Users;
  userLoading = true;

  constructor(
    private usersService: UsersServiceService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.usersService.fetchOneUser(id).subscribe(userSingleRes => {
        console.log({userSingleRes});
        this.userLoading = false;
        this.singleUser = userSingleRes.result;
        this.formInit(userSingleRes.result);
      })
    })
  }

  formInit(user: Users) {
    this.editUserForm = new FormGroup({
      firstName: new FormControl(user.firstName, {
        updateOn: 'change'
      }),
      lastName: new FormControl(user.lastName, {
        updateOn: 'change'
      }),
      username: new FormControl(user.username, {
        updateOn: 'change'
      }),
      email: new FormControl(user.email, {
        updateOn: 'change'
      }),
      phone: new FormControl(user.phone, {
        updateOn: 'change'
      }),
      type: new FormControl(user.type, {
        updateOn: 'change'
      }),
      roleId: new FormControl(user.roleId, {
        updateOn: 'change'
      }),
      password: new FormControl(null, {
        updateOn: 'change'
      })
    })
  }


  updateUser() {
    console.log(this.editUserForm.value)
    const newUser = Object.assign({}, this.singleUser, this.editUserForm.value)
    console.log({newUser})
    this.usersService.updateUser(newUser).subscribe();
  }

}
