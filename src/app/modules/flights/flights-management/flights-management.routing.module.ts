import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsManagementComponent } from './flights-management.component';

const routes: Routes = [
  {
    path:'',
    component:FlightsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }