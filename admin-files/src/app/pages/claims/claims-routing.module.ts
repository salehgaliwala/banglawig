import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsComponent } from './claims.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimsComponent
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then(m => m.AddModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./claim-detail/claim-detail.module').then(m => m.ClaimDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule { }
