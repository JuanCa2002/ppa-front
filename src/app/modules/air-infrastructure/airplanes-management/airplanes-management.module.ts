import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AirplanesManagementComponent } from "./airplanes-management.component";
import { AirplanesManagementRoutingModule } from "./airplanes-management.routing.module";
import { AirplanesManagamentTableComponent } from "./components/airplanes-managament-table/airplanes-managament-table.component";
import { AirplanesManagamentTableShowComponent } from "./components/airplanes-managament-table-show/airplanes-managament-table-show.component";

@NgModule({
    declarations: [
        AirplanesManagementComponent,
        AirplanesManagamentTableComponent,
        AirplanesManagamentTableShowComponent
    ],
    imports: [
      CommonModule,
      AirplanesManagementRoutingModule,
      SharedModule
    ]
  })
  export class AirplanesManagementModule { }
  