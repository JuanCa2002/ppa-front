import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirplanesManagementComponent } from './airplanes-management.component';

const routes: Routes = [
  {
    path:'',
    component:AirplanesManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirplanesManagementRoutingModule { }