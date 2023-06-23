import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { Auth, UserRes, User } from './auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false)

  authenticated = false;
  admin?: User|null;
  // private _token = new BehaviorSubject<string>('');
  token = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private nzMessage: NzMessageService,
    private router: Router
  ) { }

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }
  // get token() {
  //   return this._token.asObservable();
  // }

  logIn(data: Auth) {
    const laoding = this.nzMessage.loading('you are logging in', { nzDuration: 0 });
    const {username, password, remember} = data;
    return this.http.post<UserRes>(`${environment.url.base}/users/login`, {username, password}).pipe(
      take(1),
      tap(userRes => {
        this.nzMessage.remove(laoding.messageId)
        console.log({userRes})
        if(userRes.result.user?.roleId === 1) {
          this._isLoggedIn.next(true);
          this.admin = userRes.result.user;
          this.authenticated = true;
          this.token = userRes.result.token;
          this.router.navigate(['/', 'pages', 'welcome'])
        } 

        if(remember){
          this.storageService.set('loginDetails', {username, password});
          this.storageService.set('token', this.token);
        }
      })
    )
  }

  logOut() {
    this.admin = null;
    this.authenticated = false;
    this.token = '';
    this._isLoggedIn.next(false);
  }
}
