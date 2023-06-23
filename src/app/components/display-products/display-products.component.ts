import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
})
export class DisplayProductsComponent implements OnInit {
    @Input() categoryId: number;
    products: Product[];

    sortOptions: any[];

    sortOrder: number;

    sortField: string;

    sortKey: string;
    isLoading = true;
    isLoggedIn = false;
    authSub: Subscription;
    geodata: any;
  constructor(
    private productService: ProductsService,
    private nav: NavController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authSub = this.authService.loggedIn.subscribe(res => this.isLoggedIn = res);
    this.productService.geodata().subscribe(res=>{
      this.geodata=res;
    });
    if(!this.categoryId){
      this.isLoading = false;
      this.productService.fetchProductsBySearch(' ').subscribe(products => {
        this.products = products.result.rows;
        this.isLoading = false;
        console.log(this.products);
      });
    } else {
      this.isLoading = false;
      this.productService.fetchProductsByCat(this.categoryId).subscribe(products => {
        this.products = products.result.rows;
        this.isLoading = false;
        console.log(this.products);
      });
    }

    // this.phoneCoverService.fetchPhoneCoversByFilter(1, 'male', null, []).subscribe(data=>{
    //   console.log('fetch fn covers : ', data);
    //   this.phoneCovers = data.data.data;
    // });

    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];
   
  }

  selectProduct(slug){
    this.nav.navigateForward(`tabs/products/${slug}`);
  }

  search(dv, value) {
    console.log('value', value);
    dv.filter(value);
  }

  onSortChange(event) {
    console.log({event});
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
  }

  generateRandom(min = 0, max = 20) {

    // find diff
    const difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

}
