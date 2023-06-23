import { WishlistRes, WishlistAddRes } from './../../models/wishlist.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from '../../account/account.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Wishlist } from 'src/app/models/wishlist.model';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  _wishlists = new BehaviorSubject<Wishlist[]>([]);

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  get wishlist() {
    return this._wishlists.asObservable();
  }

  fetchWishlist() {
    const httpOptions = this.httpOptions();
    return this.http.get<WishlistRes>(`${environment.url.base}/get-all-wishList`, httpOptions).pipe(
      take(1),
      tap(wishlistRes => {
        if(wishlistRes.success) {
          console.log('wishlist fetch service : ', wishlistRes);
          this._wishlists.next(wishlistRes.data);
        } else {}
      })
    );
  }

  addToWishlist(productId, SkuId, backgroundImage=null, phoneDesignId=null) {
    const token = this.accountService.userToken;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };

    const body = {productId, SkuId, backgroundImage, phoneDesignId};
    if(phoneDesignId === null || phoneDesignId === '' || phoneDesignId === undefined){
      delete body.phoneDesignId;
    }

    return this.http.post<WishlistAddRes>(
      `${environment.url.base}/add-to-wishlist`,
      body,
      httpOptions).pipe(
      take(1),
      tap(wishlistAddRes=>{
        if(wishlistAddRes.success){
          const singleWishlist: any = wishlistAddRes.data;
          delete singleWishlist.customerId;
          delete singleWishlist.created_at;
          delete singleWishlist.updated_at;
          this.wishlist.pipe(take(1)).subscribe(res=>{
            console.log('added to wishlist : ', [singleWishlist].concat(res));
            this._wishlists.next([singleWishlist].concat(res));
          });
        } else {}
      })
    );
  }

  deleteWishlist(id) {
    const httpOptions = this.httpOptions();
    return this.http.get<WishlistAddRes>(`${environment.url.base}/delete-wishList/${id}`, httpOptions).pipe(
      take(1),
      tap(wishlistAddRes=>{
        this.wishlist.pipe(take(1)).subscribe(res=>{
          const newList = res.filter(data=>data.id !== id);
          this._wishlists.next(newList);
        });
      })
    );
  }

  httpOptions() {
    const token = this.accountService.userToken;
    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
  }


}
