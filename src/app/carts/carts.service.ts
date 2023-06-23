/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Carts } from './carts.model';

@Injectable({
  providedIn: 'root'
})

export class CartsService {

  carts: Carts[];
  totalCart: number;

  constructor() {
    this.carts = [
      {
        product_id: '12',
        product_title: 'product one',
        product_image: '../../assets/images/productone.png',
        unit_price: 300,
        qty: 1
      },
      {
        product_id: '13',
        product_title: 'product Two',
        product_image: '../../assets/images/productone.png',
        unit_price: 300,
        qty: 1
      },
      {
        product_id: '14',
        product_title: 'product Three',
        product_image: '../../assets/images/productone.png',
        unit_price: 300,
        qty: 1
      },
    ];

  }

  getTotalCartQty() {
    let totalCartQty = 0;
    this.carts.map(cartItem => {
      totalCartQty += cartItem.qty;
    });
    return totalCartQty;
  }

  /**
   * retrieves the products carted quantity from product id
   *
   * @param product_id
   * @returns number
   */
  getCartQuantityByProduct(product_id): number {
    const cartItem: Carts[] = this.carts.filter( data => data.product_id === product_id );
    console.log(cartItem);
    if(cartItem.length === 0) {
      return 0;
    } else {
      return cartItem[0].qty;
    }
  }

  addCartItem(cart: Carts) {
    let push = true;
    this.carts.map((cartItem, index) => {
      if (cartItem.product_id === cart.product_id){
        push = false;
        console.log('cart index', cartItem);
        console.log('cart index', index);
        this.carts[index].qty = cart.qty;
      }
      else{
      }
    });
    if(push){
        this.carts.push(cart);
    }
  }

  changeCartQty(index, qty){
    this.carts[index].qty = qty;
  }

  subTotal() {
    let total = 0;
    this.carts.map((cartItem)=>{
      total += (cartItem.unit_price * cartItem.qty);
    });

    return total;
  }
}
