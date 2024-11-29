import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportsManagementComponent } from './airports-management.component';

const routes: Routes = [
  {
    path:'',
    component:AirportsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirportsManagementRoutingModule { }