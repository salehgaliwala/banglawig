import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PhoneCover, PhoneCoverRes } from './../../models/phone-cover.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PhoneCoverService {

  private _phoneCovers = new BehaviorSubject<PhoneCover[]>([]);

  private _selectedPhoneCover = new BehaviorSubject<PhoneCover>(null);

  constructor(
    private http: HttpClient
  ) { }

  get phoneCovers() {
    return this._phoneCovers.asObservable();
  }

  get selectedPhoneCover() {
    return this._selectedPhoneCover.asObservable();
  }

  addSelectedPhoneCover(phoneCover: PhoneCover) {
    this._selectedPhoneCover.next(phoneCover);
  }

  fetchPhoneCovers(data=[]) {
    const body = {
      type: 'phone-cover',
      gender: null,
      phoneModel: null
    };
    return this.http.post<PhoneCoverRes>(`${environment.url.base}/setting/get-phone-cover`, body).pipe(
      take(1),
      tap(res=>{
        this._phoneCovers.next(data.concat(res.data.data));
      })
    );
  }

  fetchPhoneCoversByFilter(page=1,gender=null, phoneModel=null, data=[]) {
    const body = {
      // type: 'phone-cover',
      gender,
      phoneModel
    };
    console.log(body);
    return this.http.post<PhoneCoverRes>(`${environment.url.base}/setting/get-phone-cover?page=${page}`, body).pipe(
      take(1),
      tap(res=>{
        if(page === 1) {
          this._phoneCovers.next(res.data.data);
        } else {
          this._phoneCovers.next(data.concat(res.data.data));
        }
      })
    );
  }

}
