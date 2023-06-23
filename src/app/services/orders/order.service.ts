import { environment } from './../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderAddress, OrdersRes, SingleOrderRes } from '../../models/orders.model';
import { AccountService } from 'src/app/account/account.service';
import { catchError, take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orders = new BehaviorSubject<Order[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get orders() {
    return this._orders.asObservable();
  }

  fetchOrders() {
    return this.http.get<OrdersRes>(`${environment.url.main}/orders`).pipe(
      take(1),
      tap(orderRes => {
        console.log({orderRes});
        this._orders.next(orderRes.result.rows);
      })
    );
  }

  fetchSingleOrder(orderId){
    return this.orders.pipe(
      take(1),
      map(orders => orders.find(o => o.id === +orderId))
    );
  }

  addOrder(orderAddress: OrderAddress) {
    return this.http.post<OrdersRes>(`${environment.url.main}/orders`, orderAddress).pipe(
      take(1),
      tap(orderRes=>{
        console.log({orderRes});
        this._orders.next(orderRes.result.rows);
        return orderRes;
      })
    );
  }

  addCustomOrder(shippingAddressId, mainImage='', backgroundImage='', logoImage='', text='',
  gift=0, message='', from='', couponCode=null, modelName='Customized') {
    const body = {
      shippingAddressId,
      mainImage,
      backgroundImage,
      logoImage,
      text,
      gift,
      message,
      from,
      couponCode,
      modelName
    };
    console.log('custom order body : ', body, text.length);
    return this.http.post<any>(`${environment.url.base}/order/custom`, body).pipe(
      take(1),
      tap(order=>{
        console.log('custom order : ', order);
      }),
      catchError(err => of('error', err))
    );
  }

  trackOrder(id) {
    return this.http.get<SingleOrderRes>(`${environment.url.main}/orders/${id}`).pipe(
      take(1),
      tap(orderRes=>{
        console.log('order track : ', orderRes);
        return orderRes;
      })
    );
  }


}
