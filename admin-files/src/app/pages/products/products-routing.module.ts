import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'add',
    loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-product/edit-product.module').then(m => m.EditProductModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
