import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Users, usersRes, UsersSingleRes } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  _users = new BehaviorSubject<Users[]>([]);
  _usersCount = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { }

  get users() {
    return this._users.asObservable();
  }

  get usersCount() {
    return this._usersCount.asObservable();
  }

  fetchUsers(data: any){
    for(const [key, value] of Object.entries(data)){
      if(!value) delete data[key];
    }
    return this.http.get<usersRes>(`${environment.url.base}/users`, {params: {...data}}).pipe(
      take(1),
      tap(usersRes => {
        console.log({usersRes});
        this._users.next(usersRes.result.rows);
        this._usersCount.next(usersRes.result.count);
        return usersRes;
      })
    )
  }

  searchUserByEmail(email:string) {
    return this.http.get<usersRes>(`${environment.url.base}/users/email/${email}`).pipe(
      take(1),
      tap(usersRes => {
        console.log({usersRes});
        return usersRes;
      })
    )
  }

  fetchOneUser(id: any) {
    return this.http.get<UsersSingleRes>(`${environment.url.base}/users/admin/single/${id}`).pipe(
      take(1),
      tap(usersSingleRes => {
        console.log({usersSingleRes});
        return usersSingleRes;
      })
    )
  }

  
  updateUser(user: Users) {
    return this.http.put<UsersSingleRes>(`${environment.url.base}/users/admin`, {...user}).pipe(
      take(1),
      tap(usersSingleRes => {
        console.log({usersSingleRes});
        return usersSingleRes;
      })
    )
  }

  addUser(user: any) {
    return this.http.post<UsersSingleRes>(`${environment.url.base}/users/admin`, {...user}).pipe(
      take(1),
      tap(usersSingleRes => {
        console.log({usersSingleRes});
        return usersSingleRes;
      })
    )
  }

  
}
