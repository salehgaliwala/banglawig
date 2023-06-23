import { SettingsRes } from './../models/settings.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  get(value){
    const body = {
      keys: value
    };
    return this.http.post<SettingsRes>(`${environment.url.base}/setting/get`, body).pipe(
      tap(res=>res)
    );
  }
}
