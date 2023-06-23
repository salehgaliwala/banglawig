import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from '../account/account.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('../category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'carts',
        loadChildren: () => import('../carts/carts.module').then(m => m.CartsPageModule),
        canActivate:[AccountGuard],
      },
      {
        path: 'checkout',
        loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('../pages/pages.module').then(m => m.PagesPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule),
        canActivate:[AccountGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
