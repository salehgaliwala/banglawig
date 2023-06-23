import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';
import { Subscription } from 'rxjs';
import { WishlistService } from './../services/wishlist/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Wishlist } from '../models/wishlist.model';
import { CartService } from '../services/cart.service';
import { NavController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlists: Wishlist[] = [];
  wishlistSub: Subscription;
  isLoading = true;

  constructor(
    private wishlistService: WishlistService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private phoneCoverService: PhoneCoverService,
    private nav: NavController,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.wishlistService.fetchWishlist().subscribe(res=>{
      this.isLoading = false;
    });
    this.wishlistSub = this.wishlistService.wishlist.subscribe(wishlists=>{
      this.wishlists = wishlists;
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.wishlistService.fetchWishlist().subscribe(res=>{
      this.isLoading = false;
    });
  }

  onViewProduct(i) {
    const wish = this.wishlists[i];
    const design = {
        id: wish.phoneDesignId,
        type: null,
        price: wish.price,
        gender: null,
        phoneModel: null,
        image: wish.backgroundImage,
        created_at: null,
        updated_at: null
    };
    this.phoneCoverService.addSelectedPhoneCover(design);
    this.productsService.addSelectedProductBackground(design.image);
    this.nav.navigateForward(`products/${wish.slug}`);
  }

  addToCart(id, productId, skuId, backgroundImage, phoneDesignId) {
    skuId = skuId ? skuId : productId;
    this.cartService.addTOCart(productId, skuId, 1, backgroundImage, phoneDesignId).subscribe(res=>{
      if(res.success){
        this.wishlistService.deleteWishlist(id).subscribe();
      }
    });
  }

  onDeleteWishItem(id) {
    this.wishlistService.deleteWishlist(id).subscribe();
  }

}
