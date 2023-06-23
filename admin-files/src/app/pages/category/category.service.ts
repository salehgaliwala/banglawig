import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category, CategoryRes, AddCategoryRes, CategoryWithCountRes, CategoryProductRelation } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categoryNested = new BehaviorSubject<Category[]>([]);
  private _categoryAll = new BehaviorSubject<Category[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get categoryNested(){
    return this._categoryNested.asObservable();
  }

  get categoryAll(){
    return this._categoryAll.asObservable();
  }

  fetchNested(){
    return this.http.get<CategoryRes>(`${environment.url.base}/categories`).pipe(
      take(1),
      tap(catRes => {
        this._categoryNested.next(catRes.result);
        return catRes;
      })
    )
  }

  fetchAll(){
    return this.http.get<CategoryWithCountRes>(`${environment.url.base}/categories/all`).pipe(
      take(1),
      tap(catRes => {
        this._categoryAll.next(catRes.result.rows);
        return catRes;
      })
    )
  }


  add(data: any){
    return this.http.post<AddCategoryRes>(`${environment.url.base}/categories`, data).pipe(
      take(1),
      tap(catRes => {
        // if(!catRes.result.parentId) {
        //   this._categoryNested.next(this._categoryNested.value.concat(catRes.result));
        // } else {
        //   const findParentIndex = this._categoryNested.value.filter(el => el.id === catRes.result.parentId)
        // }
        // this._categoryRes.next(this._categoryRes.value.concat(catRes.result));
        this._categoryAll.next(this._categoryAll.value.concat(catRes.result))
        return catRes;
      })
    )
  }

  update(id: number, data: any){
    return this.http.put<AddCategoryRes>(`${environment.url.base}/categories/${id}`, data).pipe(
      take(1),
      tap(catRes => {
        const old = [...this._categoryAll.value];
        const index = old.findIndex(cat => cat.id === id);
        const res = catRes.result;
        old[index] = {...res};
        this._categoryAll.next(old);
        return catRes;
      })
    )
  }


  createProCatRelBulk(data: CategoryProductRelation[]){
    return this.http.post<any>(`${environment.url.base}/products-cat/bulk`, data).pipe(
      take(1),
      tap(ProCatRes => {
        return ProCatRes;
      })
    )
  }
}
