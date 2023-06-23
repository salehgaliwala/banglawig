import { CartRes } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { AccountService } from './../../account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  _couponCode = new BehaviorSubject<CartRes>(null);


  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private cartService: CartService
  ) { }

  get couponCode() {
    return this._couponCode.asObservable();
  }


  applyCoupon(coupon) {
    const token = this.accountService.userToken;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };

    return this.http.post<CartRes>(`${environment.url.base}/coupon/apply`,{coupon}, httpOptions).pipe(
      take(1),
      tap(res=>{
        console.log('apply coupon res : ', res);
        //this.cartService.fetchCartObj().subscribe();
        this._couponCode.next(res);
      })
    );
  }
}
