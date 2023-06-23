import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'add',
    loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
