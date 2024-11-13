import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipalitiesManagementComponent } from './municipalities-management.component';

const routes: Routes = [
  {
    path:'',
    component:MunicipalitiesManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipalitiesManagementRoutingModule { }