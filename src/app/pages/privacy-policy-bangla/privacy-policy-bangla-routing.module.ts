import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyPolicyBanglaPage } from './privacy-policy-bangla.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyBanglaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyPolicyBanglaPageRoutingModule {}
