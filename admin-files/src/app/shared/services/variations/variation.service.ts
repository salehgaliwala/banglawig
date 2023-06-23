import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { AttributeNestedRes, VariationRes, VariationSingleRes } from 'src/app/pages/products/Product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VariationService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    return this.http.post<VariationSingleRes>(`${environment.url.base}/variations`, {...data}).pipe(
      take(1),
      tap(variationRes => {
        return variationRes;
      })
    );
  }

  createAtATime(data: any) {
    return this.http.post<VariationRes>(`${environment.url.base}/variations/total`, {...data}).pipe(
      take(1),
      tap(variationRes => {
        return variationRes;
      })
    );
  }

  update(data: any){
    return this.http.put<VariationSingleRes>(`${environment.url.base}/variations`, {...data}).pipe(
      take(1),
      tap(variationRes => {
        return variationRes;
      })
    );
  }

  fetchNestedAttr(){
    return this.http.get<AttributeNestedRes>(`${environment.url.base}/attributes/nested`).pipe(
      take(1),
      tap(attributeRes => {
        return attributeRes;
      })
    );
  }

  createVariationAttr(data: any) {
    return this.http.post<VariationSingleRes>(`${environment.url.base}/variations/attributes`, {...data}).pipe(
      take(1),
      tap(variationRes => {
        return variationRes;
      })
    );
  }

  createVariationDetails(data: any) {
    return this.http.post<VariationSingleRes>(`${environment.url.base}/variations/details`, {...data}).pipe(
      take(1),
      tap(variationRes => {
        return variationRes;
      })
    );
  }
}
