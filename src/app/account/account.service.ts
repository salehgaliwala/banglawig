/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  _userIsAuthenticated = false;
  _userId = null;
  _userToken = null;

  constructor(private storageService: StorageService) {
    this.setConstants().then(()=>{
      this.isLoggedIn();
    });
  }

  async setConstants() {
    this._userIsAuthenticated = await this.storageService.get('_userIsAuthenticated');
    this._userId = await this.storageService.get('_userId');
    this._userToken = await this.storageService.get('_userToken');

  }

  get userId(){
      return this._userId;
  }

  get userIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  get userToken() {
    return this._userToken;
  }

  public isLoggedIn() {
    if(this._userIsAuthenticated) {
      return true;
    } else{
      return false;
    }
  }

  async logIn(token){
    this._userIsAuthenticated = true;
    this._userToken = token;
    //await this.storeToken(token);
    await this.storageService.set('_userIsAuthenticated', true);
    await this.storageService.set('_userToken', token);
  }

  async logOut(){
    this._userIsAuthenticated = false;
    await this.storageService.set('_userIsAuthenticated', false);
    await this.storageService.set('_userToken', false);
    console.log('logged out');
  }

  async storeToken(token) {
    await this.storageService.set('_userToken', token);
    await this.storageService.set('_userToken', token);
  }

  async deleteToken() {
    await this.storageService.set('_userToken', false);
  }
}
