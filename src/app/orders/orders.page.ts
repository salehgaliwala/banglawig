import { Order } from './../models/orders.model';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../services/orders/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {

  orderSub: Subscription;
  orders: Order[];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.fetchOrders().subscribe();
    this.orderSub = this.orderService.orders.subscribe(orders=>{
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

}
