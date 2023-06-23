import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttributeNested, AttributeNestedRes, AttributeRes, AttributeValueSingleRes } from '../products/Product.model';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  _attributes = new BehaviorSubject<AttributeNested[]>([])

  constructor(
    private http: HttpClient
  ) { }

  get attributes(){
    return this._attributes.asObservable();
  }

  fetchAttributesNested(){
    return this.http.get<AttributeNestedRes>(`${environment.url.base}/attributes/nested`).pipe(
      take(1),
      tap(attributeRes => {
        this._attributes.next(attributeRes.result.rows);
        return attributeRes;
      })
    );
  }

  createAttribute(data: {title: string, description: string}){
    return this.http.post<AttributeRes>(`${environment.url.base}/attributes`, data).pipe(
      take(1),
      tap(attributeRes => {
        const oldValues = [...this._attributes.value];
        this._attributes.next([ ...oldValues, attributeRes.result]);
        return attributeRes;
      })
    );
  }

  updateAttribute(id: number, data: {title?: string, description?: string}){
    return this.http.put<AttributeRes>(`${environment.url.base}/attributes/${id}`, data).pipe(
      take(1),
      tap(attributeRes => {
        const oldValues = [...this._attributes.value];
        const index = oldValues.findIndex(ov => ov.id === id);
        oldValues[index] = {...attributeRes.result};
        this._attributes.next([ ...oldValues]);
        return attributeRes;
      })
    );
  }

  deleteAttribute(id: number){
    return this.http.delete<any>(`${environment.url.base}/attributes/${id}`).pipe(
      take(1),
      tap(attributeRes => {
        const oldValues = [...this._attributes.value];
        const newValues = oldValues.filter(ov => ov.id !== id);
        this._attributes.next([ ...newValues]);
        return attributeRes;
      })
    );
  }

  createAttributeValue(data: {attributeId: number; title: string, description: string}){
    return this.http.post<AttributeValueSingleRes>(`${environment.url.base}/attributes/values`, data).pipe(
      take(1),
      tap(attributeRes => {
        const oldValues = [...this._attributes.value];
        oldValues.map(ov => {
          if(ov.id === data.attributeId) {
            ov.attributeValue = [...ov.attributeValue!, attributeRes.result];
          }
        })
        this._attributes.next( [...oldValues] );
        return attributeRes;
      })
    );
  }

  updateAttributeValue(id: number, data: {attributeId: number; title: string, description: string}){
    return this.http.put<AttributeValueSingleRes>(`${environment.url.base}/attributes/values/${id}`, data).pipe(
      take(1),
      tap(attributeRes => {
        const oldValues = [...this._attributes.value];
        const indexAttr = oldValues.findIndex(ov => ov.id === data.attributeId);
        const indexAttrValue =  oldValues[indexAttr].attributeValue!.findIndex(ovv => ovv.id === id);
        oldValues[indexAttr].attributeValue![indexAttrValue] = {...attributeRes.result};
        this._attributes.next([ ...oldValues]);
        return attributeRes;
      })
    );
  }


  deleteAttributeValue(id: number, attributeId: number){
    return this.http.delete<any>(`${environment.url.base}/attributes/values/${id}`).pipe(
      take(1),
      tap(attributeRes => {
        const oldValues = [...this._attributes.value];
        const indexAttr = oldValues.findIndex(ov => ov.id === attributeId);
        const newValues = oldValues[indexAttr].attributeValue?.filter(ov => ov.id !== id)
        oldValues[indexAttr].attributeValue = [...newValues!];
        this._attributes.next( [...oldValues] );
        return attributeRes;
      })
    );
  }
}
