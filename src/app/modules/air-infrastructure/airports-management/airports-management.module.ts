import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AirportsManagementComponent } from "./airports-management.component";
import { AirportsManagementRoutingModule } from "./airports-management.routing.module";
import { AirportsManagementFilterComponent } from "./components/airports-management-filter/airports-management-filter.component";
import { AirportsManagementTableComponent } from "./components/airports-management-table/airports-management-table.component";
import { AirportsManagementCreateComponent } from "./components/airports-management-create/airports-management-create.component";

@NgModule({
    declarations: [
     AirportsManagementComponent,
     AirportsManagementFilterComponent,
     AirportsManagementTableComponent,
     AirportsManagementCreateComponent
    ],
    imports: [
      CommonModule,
      AirportsManagementRoutingModule,
      SharedModule
    ]
  })
  export class AirportsManagementModule { }