import { ParamShippingCost } from './../models/address.model';
import { OrderVideoComponent } from './../components/video/order-video/order-video.component';
import { Subscription } from 'rxjs';
import { CartRes } from './../models/cart.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/orders/order.service';
import { AddressService } from '../services/address/address.service';
import { AddressSingle } from '../models/address.model';
import { ToastService } from '../services/controllers/toast.service';
import { AccountService } from '../account/account.service';
import { StorageService } from '../services/storage.service';
import { CouponService } from '../services/coupon/coupon.service';
import { AuthService } from '../services/auth.service';
import { OrderAddress } from '../models/orders.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage implements OnInit, OnDestroy {

  terms = true;

  cartSub: Subscription;
  cartDetails: CartRes;
  subTotal: number;
  cartLoading = true;

  addressForm: FormGroup;

  shippingCost: number;
  geodata: any;

  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private productsService: ProductsService,
    ) { }

  ngOnInit() {
    this.cartsInit();
    this.addressFormInit();
  }

  cartsInit() {
    this.cartLoading = true;
    this.cartService.fetchCartObj().subscribe(()=> this.cartLoading = false);
    this.cartSub = this.cartService.cartObj.subscribe(res=>{
      this.cartDetails = res;
      this.cartService.calcCartSubTotal().subscribe(subTotal => this.subTotal = subTotal);
      this.productsService.geodata().subscribe(response => {
        this.geodata = response;
      });
    });
  }

  addressFormInit(){
    this.addressForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      whatsapp: new FormControl(null, {
        updateOn: 'change',
        validators: []
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      state: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      postcode: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      country: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  addressSubmit(){

  }

  onPlacingOrder() {
    console.log(this.addressForm.value);
    if(!this.addressForm.valid){
      this.toastService.toast('please fill up the address correctly');
      return;
    }
    this.loadingCtrl.create({
      message: 'Placing order',
      mode: 'ios'
    }).then(el=>{
      el.present();
    });

    this.processOrder(this.addressForm.value);
  }





  getShippingCost(body: ParamShippingCost){

  }


  processOrder(orderAddress: OrderAddress){
    // TODO: create address form , addressform.value = orderAddress
    this.orderService.addOrder(orderAddress).subscribe(res=>{
      this.loadingCtrl.dismiss();
      this.toastService.toast('Order placed successfully', 'success', 5000);
      this.nav.navigateForward('tabs/orders');
    });
  }

  termsAccept(event) {
    console.log('terms event : ', event);
    this.terms = !this.terms;
    console.log('terms : ', this.terms);
  }


  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

}
