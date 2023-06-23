/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */

import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, from } from 'rxjs';

import { CartAdd, CartItem, CartRes } from '../models/cart.model';
import { map, reduce, switchAll, switchMap, take, tap, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class CartService {

  _cartObj = new BehaviorSubject<CartRes>(null);

  constructor(
    private http: HttpClient
  ) { }

  get cartObj() {
    return this._cartObj.asObservable();
  }


  fetchCartObj() {

    return this.http.get<CartRes>(`${environment.url.main}/carts/user`).pipe(
      take(1),
      tap(cartRes => {
        console.log({cartRes});
        this._cartObj.next(cartRes);
      })
    );
  }

  deleteCartItem(cartItemId) {
    return this.cartObj.pipe(
      take(1),
      map(cartRes => {
        console.log({cartitems: cartRes.result.cartItems, cartItemId});
        const findCartItem = cartRes.result.cartItems.find(cartItem => cartItem.id === cartItemId);
        console.log({findCartItem});
        return findCartItem;
      }),
      // eslint-disable-next-line max-len
      switchMap(cartItem => this.addTOCart({productId: cartItem.productId, variationId: cartItem.variationId, quantity: -(cartItem.quantity)}))
    );

  }

  addTOCart(body: CartAdd){
    return this.http.post<CartRes>(
      `${environment.url.main}/carts/add`,
      body).pipe(
      take(1),
      tap(cartRes => {
        console.log({cartRes});
        this._cartObj.next(cartRes);
      })
    );
  }

  calcCartSubTotal(){
    return this.cartObj.pipe(
        take(1),
        // eslint-disable-next-line arrow-body-style
        map( cartRes => {
          // eslint-disable-next-line arrow-body-style
          return cartRes.result.cartItems.reduce((total, currentItem)=>{
            // eslint-disable-next-line max-len
            return total + (( currentItem.variation ? currentItem.variation.VariationDetail.price : currentItem.product.price)*currentItem.quantity);
          },0);
        })
      );
  }

}
