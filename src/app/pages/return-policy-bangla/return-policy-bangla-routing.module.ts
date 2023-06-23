import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnPolicyBanglaPage } from './return-policy-bangla.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnPolicyBanglaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnPolicyBanglaPageRoutingModule {}
