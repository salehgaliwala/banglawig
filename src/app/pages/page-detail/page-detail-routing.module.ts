import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDetailPage } from './page-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDetailPageRoutingModule {}
