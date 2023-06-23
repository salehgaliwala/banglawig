
import { Subscription } from 'rxjs';
import { CartAdd, CartRes } from './../models/cart.model';
import { BreakpointObserverService } from './../services/breakpoint.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/controllers/toast.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit, OnDestroy {
  layout = 'horizontal';
  carts: CartRes = null;
  cartSub: Subscription;
  subTotal;
  geodata: any;

  constructor(
    private breakpoint: BreakpointObserverService,
    private nav: NavController,
    private cartService: CartService,
    private toastService: ToastService,
    private productsService: ProductsService,
    ) {
     }

  ngOnInit() {
    this.productsService.geodata().subscribe(res => {
      this.geodata = res;
    });
    this.getLayout();
    this.cartInit();
  }

  getLayout(){
    this.breakpoint.size.subscribe((data)=>{
      console.log(data);
      if(data === 'sm' || data === 'md' || data === 'lg' || data === 'xl'){
        this.layout = 'vertical';
      }
      else {
        this.layout = 'horizontal';
      }
    });
  }


  cartInit(){
    this.cartService.fetchCartObj().subscribe();
    this.cartSub = this.cartService.cartObj.subscribe(cartObj=> {
      if(cartObj && cartObj.success) {
        this.carts = cartObj;
        this.cartService.calcCartSubTotal().subscribe(res => this.subTotal = res);
        console.log(this.subTotal);
      }
    });
   
  }


  onProceedCheckout() {
    if(this.carts.result.cartItems.length <= 0 ){
      this.toastService.toast('please cart a product before proceed checkout');
    } else{
      this.nav.navigateForward('tabs/checkout');
    }
  }


  // helpers

  addToCart(data: CartAdd) {
    this.cartService.addTOCart(data).subscribe();
  }

  onDeleteCartItem(cartId) {
    this.cartService.deleteCartItem(cartId).subscribe();
  }



  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
