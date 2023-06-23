import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRes } from '../models/user.model';
import { take, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _referrer = new BehaviorSubject<string>('');
  _loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private toastCtrl: ToastController
  ) {
    this._loggedIn.next(this.accountService.isLoggedIn());
  }

  get referrer() {
    return this._referrer.asObservable();
  }

  get loggedIn() {
    return this._loggedIn.asObservable();
  }

  addReferrer(referrer='/tabs/home') {
    this._referrer.next(referrer);
  }

  signUp({username, name, email, password}){
    return this.http.post<UserRes>(`${environment.url.main}/users`, {username, name, email, password}).pipe(
      take(1),
      tap(userRes => {
        console.log({userRes});
        if(!userRes.success){
          this.toastCtrl.create({message: userRes.message, color: 'danger'});
        } else {
          // ! REMOVE it when verify email is ready
          this.accountService.logIn(userRes.result.token);
          this._loggedIn.next(true);
        }
        return userRes;
      })
    );
  }

  logIn({username, password}){
    return this.http.post<UserRes>(`${environment.url.main}/users/login`, {username, password}).pipe(
      take(1),
      tap(userRes => {
        console.log({userRes});
        if(!userRes.success){
          this.toastCtrl.create({message: userRes.message, color: 'danger'});
        } else {
          this.accountService.logIn(userRes.result.token);
          this._loggedIn.next(true);
        }
        return userRes;
      })
    );
  }

  logOut(){
    this.accountService.logOut();
    this._loggedIn.next(false);
  }



  getToken() {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hdXRoLnJvbmdvYnV5LmNvbVwvYXBpXC9hdXRoXC92MVwvY2hlY2stb3RwIiwiaWF0IjoxNjM2Mjc5ODQ4LCJleHAiOjE2MzYyODM0NDgsIm5iZiI6MTYzNjI3OTg0OCwianRpIjoiY0FBMEEwZW1lSndZRGg1NiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.UuFEB4ZZMSKHdpCqJkbzmpcS7Qm7mOuqJJz62YAKfkM';
  }

    mockAddCart(token) {
    const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
    });
    const url = 'http://public.rongobuy.com/api/v1/cart/add';
    const body = {
      productId: '12',
      skuId: '12-green',
      quantity: '2'
    };
    this.http.post(url, body, {headers}).subscribe(resData=>{
      console.log('auth cart added : ', resData);
    });
  }
}
