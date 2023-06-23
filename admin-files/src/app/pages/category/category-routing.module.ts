import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
  {
    path: 'add',
    loadChildren: ()=> import('./add-category/add-category.module').then(m => m.AddCategoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
