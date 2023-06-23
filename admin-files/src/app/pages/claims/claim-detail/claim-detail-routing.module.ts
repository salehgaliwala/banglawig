import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimDetailComponent } from './claim-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimDetailRoutingModule { }
