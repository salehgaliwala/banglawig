import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand, BrandRes, BrandSingleRes } from './Brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  // private _brands = new BehaviorSubject()

  constructor(private http: HttpClient) { }

  fetch() {
    return this.http.get<BrandRes>(`${environment.url.base}/brands`).pipe(
      take(1),
      tap(brandRes => {
        return brandRes;
      })
    );
  }

  create(data: Brand) {
    return this.http.post<BrandSingleRes>(`${environment.url.base}/brands`, {...data}).pipe(
      take(1),
      tap(brandRes => {
        return brandRes;
      })
    );
  }
}
