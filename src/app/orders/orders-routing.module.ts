import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrdersPage
      },
      {
        path: ':id',
        loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
