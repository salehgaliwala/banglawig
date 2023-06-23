import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPage } from './category.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  {
    path: ':id',
    loadChildren: () => import('./category-detail/category-detail.module').then( m => m.CategoryDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
