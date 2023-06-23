import { PageRes } from './../models/page.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  _page = new BehaviorSubject<PageRes>({success: false, result: null, message: 'Pages does not exists'});

  constructor(
    private http: HttpClient
  ) { }

  get page() {
    return this._page.asObservable();
  }

  fetchPage(slug){
    return this.http.get<PageRes>(`${environment.url.main}/pages/${slug}`).pipe(
      take(1),
      tap((pageRes)=>{
        this._page.next(pageRes);
      })
    );
  }
}
