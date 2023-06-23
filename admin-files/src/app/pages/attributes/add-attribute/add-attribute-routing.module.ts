import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttributeComponent } from './add-attribute.component';

const routes: Routes = [
  {
    path: '',
    component: AddAttributeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAttributeRoutingModule { }
