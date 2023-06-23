import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Claim, ClaimAdd, ClaimRes, StatusRes } from './claims.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private _claims = new BehaviorSubject<Claim[]>([])
  private _claimCount = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient) { }

  get claims() {
    return this._claims.asObservable();
  }
  get claimCount() {
    return this._claimCount.asObservable();
  }

  /**
   * 
   * @param data | {page, status, referenceNumber}
   * @returns 
   */
  fetchClaims(data:any) {
    for(const [key, value] of Object.entries(data)) {
      if(!value) delete data[key];
    }
    return this.http.get<ClaimRes>(`${environment.url.base}/claims`,{params: {...data}}).pipe(
      take(1),
      tap(claimRes => {
        console.log({claimRes});
        this._claims.next(claimRes.result.rows)
        this._claimCount.next(claimRes.result.count)
        return claimRes;
      })
    )
  }

  getAllStatus() {
    return this.http.get<StatusRes>(`${environment.url.base}/claims/status`);
  }

  update(data: Claim) {
    return this.http.post<ClaimRes>(`${environment.url.base}/claims`, {...data}).pipe(
      take(1),
      tap(claimRes => {
        return claimRes;
      })
    )
  }

  add(data: ClaimAdd) {
    return this.http.post<ClaimRes>(`${environment.url.base}/claims/admin`, {...data}).pipe(
      take(1),
      tap(claimRes => {
        return claimRes;
      })
    )
  }
}
