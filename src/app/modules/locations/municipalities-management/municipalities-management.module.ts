import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { MunicipalitiesManagementComponent } from "./municipalities-management.component";
import { MunicipalitiesManagementRoutingModule } from "./municipalities-management.routing.module";

@NgModule({
    declarations: [
     MunicipalitiesManagementComponent
    ],
    imports: [
      CommonModule,
      MunicipalitiesManagementRoutingModule,
      SharedModule
    ]
  })
  export class MunicipalitiesManagementModule { }
  