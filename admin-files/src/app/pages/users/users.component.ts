import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersServiceService } from './users-service.service';
import { Users } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: Users[] = [];
  usersCount: number = 0;
  usersSub?: Subscription;
  usersCountSub?: Subscription;

  currentPage: number = 1;

  usersLoading: boolean = true;

  searchForm!: FormGroup;

  constructor(
    private usersService: UsersServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      email: [null],
      type: [null],
      firstName: [null],
      lastName: [null],
      page: [1]
    });
    this.initUsers();
  }
  
  getUsers() {
    this.usersLoading = true;
    this.usersService.fetchUsers(this.searchForm.value).subscribe(() => this.usersLoading = false);
  }

  initUsers(){
    this.getUsers();
    this.usersSub = this.usersService.users.subscribe(users => this.users = users );
    this.usersCountSub = this.usersService.usersCount.subscribe(count => this.usersCount = count);
  }

  pageChanged(page: number){
    this.currentPage = page;
    this.searchForm.patchValue({page});
    this.getUsers();
  }

  search(){
    console.log(this.searchForm.value)
    this.pageChanged(1);
  }

  resetForm(): void {
    this.searchForm.reset();
  }


  ngOnDestroy(): void {
      this.usersSub?.unsubscribe();
      this.usersCountSub?.unsubscribe();
  }


}
