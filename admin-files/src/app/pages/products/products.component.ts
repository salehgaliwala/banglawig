import { Component, OnInit } from '@angular/core';
import { Product } from './Product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isLoading: boolean = false;
  title?: string;

  page: number = 1;

  products: Product[] = [];
  totalProducts: number = 0;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    const data: any = {};
    if(this.title && this.title.length > 0) data.title = this.title;
    data.page = this.page;
    this.productService.fetch(data).subscribe(productRes => {
      this.products = productRes.result.rows;
      this.totalProducts = productRes.result.count;
    })
  }

  pageChanged(page: any) {
    console.log({page});
    this.page = page;
    this.loadProducts();
  }

  editProduct(id: number) {
    console.log({id});
  }

  deleteProduct(id: number){
    this.isLoading = true;
    this.productService.delete(id).subscribe(()=>{
      this.isLoading = false;
      this.products = this.products.filter(p => p.id !== id);
    })
  }

}
