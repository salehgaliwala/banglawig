import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  // },
  // {
  //   path: 'address',
  //   loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule)
  // },
  // {
  //   path: 'balance',
  //   loadChildren: () => import('./balance/balance.module').then( m => m.BalancePageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
