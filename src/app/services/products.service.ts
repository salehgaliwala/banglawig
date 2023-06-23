import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product, ProductRes, SingleProductRes } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private _product = new BehaviorSubject<Product>(null);
  private _products = new BehaviorSubject<Product[]>([]);

  constructor( private http: HttpClient) { }


  get product() {
    return this._product.asObservable();
  }

  get products() {
    return this._products.asObservable();
  }

 geodata()
  {
    return this.http.get(`${environment.url.main}/utilities/`);
  }

  fetchProductsByCat(id, page=1) {
    if(page>1) {
      return this.http.get<ProductRes>(`${environment.url.main}/products?page=${page}&categoryId=${id}`).pipe(
        take(1),
        tap( productRes =>{
          console.log({productRes});
          this.products.pipe(take(1)).subscribe(res=>{
            this._products.next(res.concat(productRes.result.rows));
          });
        })
      );
    }
    else {
      return this.http.get<ProductRes>(`${environment.url.main}/products?page=${page}&categoryId=${id}`).pipe(
        take(1),
        tap( productRes =>{
          console.log({productRes});
          this._products.next(productRes.result.rows);
        })
      );
    }
  }

  fetchProductsBySearch(title) {
    return this.http.get<ProductRes>(`${environment.url.main}/products?title=${title}`).pipe(
      take(1),
      tap( productSearchRes=>{
      console.log({productSearchRes});
        this._products.next(productSearchRes.result.rows);
      })
    );
  }

  fetchProductBySlug(slug) {
    return this.http.get<SingleProductRes>(`${environment.url.main}/products/${slug}`).pipe(
      take(1),
      tap(singleProductRes => {
        console.log({singleProductRes});
        this._product.next(singleProductRes.result);
      })
    );
  }


}
