import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateModule } from './create/create.module';
import { EditModule } from './edit/edit.module';
import { UploadModule } from './upload/upload.module';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
  },
  {
    path: ':reviewId/edit',
    loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)
  }, 
  {
    path: ':reviewId/upload',
    loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
