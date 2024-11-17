import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { MunicipalitiesManagementComponent } from "./municipalities-management.component";
import { MunicipalitiesManagementRoutingModule } from "./municipalities-management.routing.module";
import { MunicipalitiesManagementFilterComponent } from "./components/municipalities-management-filter/municipalities-management-filter.component";
import { MunicipalitiesManagementTableComponent } from "./components/municipalities-management-table/municipalities-management-table.component";

@NgModule({
    declarations: [
     MunicipalitiesManagementComponent,
     MunicipalitiesManagementFilterComponent,
     MunicipalitiesManagementTableComponent
    ],
    imports: [
      CommonModule,
      MunicipalitiesManagementRoutingModule,
      SharedModule
    ]
  })
  export class MunicipalitiesManagementModule { }
  