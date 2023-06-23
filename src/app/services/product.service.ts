import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ProductResponse {
  success: boolean;
  data: Product;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _product = new BehaviorSubject<Product>(null);

  constructor( private http: HttpClient) { }


  get product() {
    return this._product.asObservable();
  }


  fetchSingleProduct(slug) {
    return this.http.get<ProductResponse>(`${environment.url.base}/details/${slug}`).pipe(
      take(1),
      map(data=>{
        console.log(data);
        return data.data;
      }),
      tap( product=>{
        console.log('product details: ', product);
        this._product.next(product);
      })
    );
  }
  fetchSingleProductOnly(slug) {
    return this.http.get<ProductResponse>(`${environment.url.base}/details/${slug}`).pipe(
      take(1),
      map(data=>{
        console.log(data);
        return data;
      }),
      tap( product=>{
        console.log('product details: ', product);
        this._product.next(product.data);
      })
    );
  }
}
