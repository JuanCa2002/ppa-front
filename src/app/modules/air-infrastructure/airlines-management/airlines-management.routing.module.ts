import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlinesManagementComponent } from './airlines-management.component';

const routes: Routes = [
  {
    path:'',
    component:AirlinesManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlinesManagementRoutingModule { }