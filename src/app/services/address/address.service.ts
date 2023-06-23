import { AccountService } from './../../account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddressSingle, AddressRes, AddressSingleRes, AddressAdd, DivisionRes, AreaRes, DistrictRes, ParamShippingCost } from './../../models/address.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take, tap } from 'rxjs/operators';
import { ToastService } from '../controllers/toast.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _address = new BehaviorSubject<AddressSingle[]>([]);
  public areaDisable = true;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private toastService: ToastService,
    private nav: NavController
  ) { }

  get address() {
    return this._address.asObservable();
  }

  fetchAddress() {
    const httpOptions = this.getHttpOption();
    console.log('httpOptions : ', httpOptions);
    return this.http.get<AddressRes>(`${environment.url.base}/all-address`, httpOptions).pipe(
      take(1),
      tap(addressRes=>{
        console.log(addressRes);
        const data: any = addressRes.data;
        if(!addressRes.success && data === 401) {
          this.accountService.logOut();
          this.nav.navigateForward('tabs/account');
        }

        if(addressRes.data.data.length === 0){
          return;
        } else {
          this._address.next(addressRes.data.data);
        }
      })
    );
  }

  // async fetchSingleAddress() {
  //   const httpOptions = await this.getHttpOption();
  //   return this.http.get<AddressSingleRes>(`${environment.url.base}/all-address`, httpOptions).pipe(
  //     take(1),
  //     tap(addressRes=>{
  //       //this._address.next(addressRes.data.data);
  //     })
  //   );
  // }

  addAddress(address) {
    const httpOptions = this.getHttpOption();
    return this.http.post<AddressSingleRes>(`${environment.url.base}/create-address`, address, httpOptions).pipe(
      take(1),
      tap(newAddress=>{
        console.log('new address : ', newAddress);
        this.address.pipe(take(1)).subscribe(oldAddress=>{
          if(newAddress.success) {
            this._address.next(oldAddress.concat(newAddress.data));
          } else {
            this.toastService.toast(newAddress.message, 'danger', 2000);
          }
          //this.fetchAddress();
        });
      })
    );
  }

  updateAddress(id, body) {
    console.log('address  : ', body);
    const httpOptions = this.getHttpOption();
    return this.http.post<any>(`${environment.url.base}/update-address/${id}`, body, httpOptions).pipe(
      take(1),
      tap(res=>{
        console.log('updated address : ', res);
      })
    );
  }

  getHttpOption() {
    const token = this.accountService.userToken;
    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
  }

  getDivision() {
    return this.http.get<DivisionRes>(`${environment.url.base}/address/divisions`).pipe(
      take(1),
      tap(divs=>{
        console.log('divs : ', divs);
      })
    );
  }

  getDistrict(id){
    return this.http.get<DistrictRes>(`${environment.url.base}/address/district/${id}`).pipe(
      take(1),
      tap(dist=>{
        console.log('dist : ', dist);
      })
    );
  }

  getArea(id){
    return this.http.get<AreaRes>(`${environment.url.base}/address/area/${id}`).pipe(
      take(1),
      tap(area=>{
        console.log('area : ', area);
      })
    );
  }

  getShippingCost(body: ParamShippingCost) {
    return this.http.post<any>(`${environment.url.base}/shipping/price`, body).pipe(
      take(1),
      tap(res=>{
        console.log('shipping cost : ', res);
      })
    );
  }
}
