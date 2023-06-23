import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PrimeIcons} from 'primeng/api';
import { Order } from 'src/app/models/orders.model';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  orderId = null;
  orderDetail: Order;
  isLoading = true;
  orderAddress: {key: string; value: string}[];

  events1;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.fetchOrders().subscribe();
    this.isLoading = true;
    this.router.params.subscribe(orderRoute => {
      this.orderId = orderRoute.id;
      console.log('order id : ', orderRoute.id );
      this.orderService.fetchSingleOrder(orderRoute.id).subscribe(orderSingleRes => {
        this.orderDetail = orderSingleRes;
        this.isLoading = false;
        console.log('this.orderDetail : ',this.orderDetail);
        this.orderAddress = this.getOrderAddress();
      });
    });
        this.events1 = [
      {
        status: 'Ordered',
        done: true,
        working: true,
        date: '15/10/2020 10:30',
        icon: 'cart',
        color: '#9C27B0',
        image: 'game-controller.jpg',
        waiting: 'Order is pending',
        success: 'Order has been placed successfully'
      },
      {
        status: 'Processing',
        done: true,
        working: true,
        date: '15/10/2020 14:00',
        icon: 'settings',
        color: '#673AB7',
        waiting: 'Order hasn\'t processed yet',
        ongoing: 'Order is processing',
        success: 'order has been processed successfully'
      },
      {
        status: 'Shipped',
        done: false,
        working: true,
        date: '15/10/2020 16:15',
        icon: 'bus',
        color: '#FF9800',
        waiting: 'Order hasn\'t processed yet',
        ongoing: 'Order is processing',
        success: 'order has been processed successfully'
      },
      {
        status: 'Delivered',
        done: false,
        working: false,
        color: '#607D8B',
        date: '16/10/2020 10:00',
        icon: 'checkmark-done-outline',
        waiting: 'Order hasn\'t processed yet',
        ongoing: 'Order is processing',
        success: 'order has been processed successfully'
      }
    ];
  }

  getOrderAddress() {
    const address = [];
    for(const [key, value] of Object.entries(this.orderDetail.orderAddress)){
      address.push({key, value});
    }
    return address;
  }

}
