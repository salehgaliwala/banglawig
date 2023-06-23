import { catchError } from 'rxjs/operators';
import { CategoryService } from './../services/category.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { Category } from '../models/category.model';
import { ToastService } from '../services/controllers/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit, OnDestroy {
  items: MenuItem[];
  loadMoreSlug = null;
  loadMoreCounter = 1;
  menuBackLabel: string;
  catSearchPlaceholder: string;
  catSearchId: string;
  prevCat: string;
  searchData;
  categoryImages: any[];
  isPhoneCover = false;
  mockImage;

  //mock
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  pImage = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6';
  //miniProducts: MiniProduct[];
  products: Product[];
  productSub: Subscription;
  isLoading = true;

  constructor(
    private nav: NavController,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe();
    this.categoryService.categories.subscribe(categories=>{
      this.items = this.mapCats(categories);
      this.menuIterator(this.items);
      console.log('cat.items : ', this.items);
    });
    this.categoryImages = this.categoryService.images;
    this.productSub = this.productsService.products.subscribe(res => {
      this.products = res;
    });
    this.productsService.fetchProductsByCat(1).subscribe(()=>{
      this.isLoading = false;
    });
  }

mapCats(categories: Category[]) {
  const cats = [];
  categories.map(cat=>{
    const category = {
      id: cat.id,
      label: cat.title,
      escape: false,
    };
    if(cat.children.length > 0) {
      category['items'] = this.mapCats(cat.children);
      cats.push(category);
      return cats;
    } else {
      cats.push(category);
    }
  });
  return cats;
}

  menuIterator(items) {
    items.map(item=>{
      item['command'] = (event) => {
        this.menuHandler(event.item);
      };
      if(item.items) {
        this.menuIterator(item.items);
      }
    });
  }

  menuHandler(e) {
    //const e = event.item;
    this.isLoading = true;
    this.prevCat = e.id;
    console.log('menu clicked', e);
    this.catSearchPlaceholder = 'Search ' + e.label;
    this.catSearchId = e.id;
    // this.productsService.fetchProducts('Bags-and-Travel').subscribe();
    // product fetch for new cat

    // if( e.id === 'phone-cover' ){
    //   this.nav.navigateForward(`/category/phone-cover`);
    //   this.isPhoneCover = true;
    // } else {
    //   this.isPhoneCover = false;
    // }

    this.fetchProductByCat(e.id);

  }
  fetchProductByCat(id) {
    console.log('naim', id);
    this.loadMoreSlug = id;
    this.productsService.fetchProductsByCat(id).subscribe(()=>{
      this.isLoading = false;
      return true;
    });
  }
  loadData(event) {
    if(this.loadMoreSlug){
      this.loadMoreCounter++;
      console.log('infinte scroll data : ', event.target);
      this.productsService.fetchProductsByCat(this.loadMoreSlug, this.loadMoreCounter).subscribe((res)=>{
        this.isLoading = false;
        event.target.complete();
        if(res.result.rows.length<=0){
          event.target.disabled = true;
          this.toastService.toast('No more Product available', 'danger', 2000);
        }
        if (this.products.length === 1000) {
          event.target.disabled = true;
        }
        return true;
      });
    }else {
      setTimeout(() => {
        event.target.complete();
      }, 500);
    }
  }

  onClickProduct(index) {
    console.log('category index', index);
  }

  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }

  onSelectModel(event) {
    console.log('phone model : ', event);
    this.mockImage = event.img;
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}

