import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsAndConditionsBanglaPage } from './terms-and-conditions-bangla.page';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionsBanglaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsAndConditionsBanglaPageRoutingModule {}
