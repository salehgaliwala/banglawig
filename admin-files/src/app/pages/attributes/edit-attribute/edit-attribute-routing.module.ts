import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAttributeComponent } from './edit-attribute.component';

const routes: Routes = [
  {
    path: '',
    component: EditAttributeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAttributeRoutingModule { }
