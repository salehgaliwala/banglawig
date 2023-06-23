import { AccountService } from './../../account/account.service';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  addMediaString(image, imageType='product', sourceType='base64') {
    const token = this.accountService.userToken;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
    const body = {
      image,
      imageType,
      sourceType
    };
    return this.http.post<any>(`https://media.rongobuy.com/uploader`, body, httpOptions).pipe(
      take(1),
      tap(res=>{
      console.log('media res : ', res);
    })
    );
  }
}
