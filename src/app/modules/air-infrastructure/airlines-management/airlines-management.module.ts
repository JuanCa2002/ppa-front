import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AirlinesManagementRoutingModule } from "./airlines-management.routing.module";
import { AirlinesManagementComponent } from "./airlines-management.component";
import { AirlinesManagementFilterComponent } from "./components/airlines-management-filter/airlines-management-filter.component";
import { AirlinesManagementTableComponent } from "./components/airlines-management-table/airlines-management-table.component";

@NgModule({
    declarations: [
     AirlinesManagementComponent,
     AirlinesManagementFilterComponent,
     AirlinesManagementTableComponent
    ],
    imports: [
      CommonModule,
      AirlinesManagementRoutingModule,
      SharedModule
    ]
  })
  export class AirlinesManagementModule { }
  