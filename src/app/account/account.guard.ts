import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router, private authService: AuthService ){}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(!this.accountService.isLoggedIn()){
          console.log('segments from acc guard : ', state);

          this.authService.addReferrer(state.url);
          this.router.navigateByUrl('/tabs/account');
        }
      return this.accountService.userIsAuthenticated;
    }

}
