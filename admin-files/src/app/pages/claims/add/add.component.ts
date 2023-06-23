import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersServiceService } from '../../users/users-service.service';
import { Users } from '../../users/users.model';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addClaimForm!: FormGroup;
  allClaimStatus: string[] = [];

  users: Users[] = [];
  searchPrevValue = '';
  searchInterval: any;
  searchDebouncer = 500;

  constructor(
    private claimsService: ClaimsService,
    private usersService: UsersServiceService
  ) { }

  ngOnInit(): void {
    this.claimsService.getAllStatus().subscribe(res => this.allClaimStatus = res.result);
    this.addClaimForm = new FormGroup({
      userId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      town: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      postCode: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      state: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      acnNumber: new FormControl(null, {
        updateOn: 'change',
        validators: []
      }),
      status: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      claimsDetail: new FormGroup({
        debtType: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        totalOwed: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        totalReceived: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        existingClaimId: new FormControl(null, {
          updateOn: 'change',
          validators: []
        }),
        inCourt: new FormControl(false, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
      })
    })
  }

  onSearchUsers(e: any){
    if(!e) return;
    this.searchInterval = setTimeout(()=> {
      if(e === this.searchPrevValue){
        this.usersService.searchUserByEmail(e).subscribe(res => {
          this.users = res.result.rows;
        })
        setTimeout(this.searchInterval);
      }
      else return;
    },this.searchDebouncer);
    this.searchPrevValue = e;
  }

  addClaim() {
    console.log(this.addClaimForm.value);
    this.claimsService.add(this.addClaimForm.value).subscribe(res => console.log({res}));
  }
  reset() {
    this.addClaimForm.reset();
  }

}
