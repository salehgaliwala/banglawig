import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchIn = '';

  constructor() {}

  getSearchIn() {
    return this.searchIn;
  }

  setSearchIn(searchIn) {
    this.searchIn = searchIn;
  }

  saveSearchKey() {

  }

}
