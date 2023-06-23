import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributesComponent } from './attributes.component';

const routes: Routes = [
  {
    path: '',
    component: AttributesComponent
  },
  {
    path: 'add',
    loadChildren: () => import('./add-attribute/add-attribute.module').then(m => m.AddAttributeModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-attribute/edit-attribute.module').then(m => m.EditAttributeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
