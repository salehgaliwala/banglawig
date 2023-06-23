import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: any){
    const value = JSON.stringify(localStorage.getItem(key));
    return JSON.parse(value);
  }

  set(key:string, value: any) {
    return JSON.stringify(localStorage.setItem(key, value));
  }
}
