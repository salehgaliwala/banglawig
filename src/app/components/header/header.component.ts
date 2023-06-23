import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { MenuController, NavController } from '@ionic/angular';
/* eslint-disable max-len */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserverService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() searchText = 'search in Products...';
  @Input() searchId = 'products';
  @Input() searchData;
  @Input() showSearch = false;
  @Input() display = true;
  @Output() searchTextFound = new EventEmitter<Product[]>();
  @Output() searchedText = new EventEmitter<string>();
  @Output() isLoadingSearch = new EventEmitter<boolean>();
  searchShow = false;
  isLoading = false;
  logo = 'https://scontent-hkt1-1.xx.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=taviAIunbeMAX9EWmHu&_nc_ht=scontent-hkt1-1.xx&oh=a3196443215ad709d2188624635b516d&oe=61A7D55F';
  searchedProducts: Product[];

  searchResult = {
    height: 300,
    display: 'block',
    overflow: 'scroll'
  };
  searchResultData;

  toolbarStyle = {
    paddingBottom: 0,
    borderRadius: {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    }
  };
  desktop = false;

  constructor(private menu: MenuController, private nav: NavController, private productsService: ProductsService, private brkPointObs: BreakpointObserverService ) { }

  ngOnInit() {
    this.getSize();
  }

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log('menu clicked');
  }

  onSearch(event){
    console.log('search text', event.detail.value);
    if ( event.detail.value === '' || event.detail.value.length < 2) {
      this.searchShow = false;
      this.isLoading = false;
      this.isLoadingSearch.emit(false);
      this.searchTextFound.emit(null);
    }
    else {
      if( this.searchId === 'products' ) {
        console.log('products');
        this.searchedText.emit(event);
        this.productsService.fetchProductsBySearch(event.detail.value).subscribe(res=>{
          console.log('data from search : ', res.result.rows);
          this.searchShow = true;
          this.isLoading = false;
          this.isLoadingSearch.emit(false);
          this.searchTextFound.emit(res.result.rows);
          this.searchResultData = res.result.rows;
        });
      }
      else if ( this.searchId === 'categories' ) {
        console.log('categories');
        this.productsService.fetchProductsBySearch(event.detail.value).subscribe(res=>{
          console.log('data from search : ', res.result.rows);
          this.searchShow = true;
          this.isLoading = false;
          this.isLoadingSearch.emit(false);
          this.searchTextFound.emit(res.result.rows);
          this.searchResultData = res.result.rows;
        });
      }
      else {
        console.log(this.searchId);
        this.productsService.fetchProductsBySearch(event.detail.value).subscribe(res=>{
          this.searchShow = true;
          this.isLoading = false;
          this.isLoadingSearch.emit(false);
          this.searchTextFound.emit(res.result.rows);
          this.searchResultData = res.result.rows;
        });
      }
    }

  }

  onCartClicked(){
    if(!this.showSearch) {
    console.log('cart clicked');
      this.toolbarStyle.paddingBottom = 20;
      this.toolbarStyle.borderRadius.bottomLeft = 30;
      this.toolbarStyle.borderRadius.bottomRight = 30;
    }
    else {
      this.toolbarStyle.paddingBottom = 0;
      this.toolbarStyle.borderRadius.bottomLeft = 0;
      this.toolbarStyle.borderRadius.bottomRight = 0;
    }
      this.showSearch = !this.showSearch;
    //this.nav.navigateForward('/carts');
  }

  onKeyInput(event){
    this.isLoadingSearch.emit(true);
      this.isLoading = true;
      this.searchShow = false;
  }

    getSize() {
    this.brkPointObs.size.subscribe(data=>{
      console.log('size : ', data);
      if( data === 'xl' || data === 'lg' ) {
        this.desktop = true;
      } else {
        this.desktop  = false;
      }
    });
    //console.log('window : ', window.innerWidth);
  }
}
