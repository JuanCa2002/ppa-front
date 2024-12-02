import { NgModule } from "@angular/core";
import { FlightsManagementComponent } from "./flights-management.component";
import { FlightsRoutingModule } from "./flights-management.routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CarouselModule } from 'primeng/carousel';
import { FlightsManagementFilterComponent } from "./components/flights-management-filter/flights-management-filter.component";
import { FlightsManagementSearchResultComponent } from "./components/flights-management-search-result/flights-management-search-result.component";

@NgModule({
    declarations: [
       FlightsManagementComponent,
       FlightsManagementFilterComponent,
       FlightsManagementSearchResultComponent
    ],
    imports: [
      CommonModule,
      OverlayPanelModule,
      FlightsRoutingModule,
      CarouselModule,
      SharedModule
    ]
  })
  export class FlightsManagementModule { }