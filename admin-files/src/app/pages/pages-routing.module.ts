import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'claims',
        loadChildren: () => import('./claims/claims.module').then(m => m.ClaimsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'attributes',
        loadChildren: () => import('./attributes/attributes.module').then(m => m.AttributesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
