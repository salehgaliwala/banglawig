
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/controllers/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {
  loginScreen = false;
  referrer: string;
  userLoggedIn = false;
  loginSub: Subscription;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) { }

  async ngOnInit() {
    console.log('user token : ', await this.storageService.get('_userToken'));
    this.loggedInController();
    this.authService.referrer.subscribe(ref=>{
      this.referrer = ref;
      if(ref !== '') {
        this.toastService.toast('Please login to use all features', 'tertiary');
      }
      console.log('ref from acc page : ', ref);
    });
  }


  onClickLogin(){
      this.loginScreen = !this.loginScreen;
  }

  signUpSuccess(e){
    console.log({e});
  }

  loggedInController() {
      this.loginSub = this.authService.loggedIn.subscribe(res => {
        this.userLoggedIn = res;
      });
  }


  logOut() {
    this.authService.logOut();
  }


  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

}
