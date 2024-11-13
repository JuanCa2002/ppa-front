import { NgModule } from "@angular/core";
import { DepartmentManagementComponent } from "./department-management.component";
import { DepartmentManagementRoutingModule } from "./department-management.routing.module";
import { DepartmentManagmentTableComponent } from "./components/department-managment-table/department-managment-table.component";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      DepartmentManagementComponent,
      DepartmentManagmentTableComponent
    ],
    imports: [
      CommonModule,
      DepartmentManagementRoutingModule,
      SharedModule
    ]
  })
  export class DepartmentManagementModule { }
  