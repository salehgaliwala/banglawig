import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductRes, SingleProductRes } from './Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetch(data: any) {
    return this.http.get<ProductRes>(`${environment.url.base}/products`, {params: {...data}}).pipe(
      take(1),
      tap(productRes => {
        return productRes;
      })
    );
  }

  create(data: Product) {
    return this.http.post<SingleProductRes>(`${environment.url.base}/products`, {...data}).pipe(
      take(1),
      tap(brandRes => {
        return brandRes;
      })
    );
  }

  delete(id: number) {
    return this.http.delete<SingleProductRes>(`${environment.url.base}/products/${id}`).pipe(
      take(1),
      tap(brandRes => {
        return brandRes;
      })
    );
  }
}
