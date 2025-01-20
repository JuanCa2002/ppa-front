import { NgModule } from "@angular/core";
import { FlightsManagementComponent } from "./flights-management.component";
import { FlightsRoutingModule } from "./flights-management.routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CarouselModule } from 'primeng/carousel';
import { StepsModule } from 'primeng/steps';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { FlightsManagementFilterComponent } from "./components/flights-management-filter/flights-management-filter.component";
import { FlightsManagementSearchResultComponent } from "./components/flights-management-search-result/flights-management-search-result.component";
import { FlightsManagementCreateFormComponent } from "./components/flights-management-create-form/flights-management-create-form.component";
import { FlightsManagementStepBasicInfoComponent } from "./components/flights-management-create-form/steps/flights-management-step-basic-info/flights-management-step-basic-info.component";
import { FlightsManagementStepItineraryComponent } from "./components/flights-management-create-form/steps/flights-management-step-itinerary/flights-management-step-itinerary.component";
import { FlightsManagementStepScaleComponent } from "./components/flights-management-create-form/steps/flights-management-step-scale/flights-management-step-scale.component";
import { FlightsManagementStepConfirmationComponent } from "./components/flights-management-create-form/steps/flights-management-step-confirmation/flights-management-step-confirmation.component";

@NgModule({
    declarations: [
       FlightsManagementComponent,
       FlightsManagementFilterComponent,
       FlightsManagementSearchResultComponent,
       FlightsManagementCreateFormComponent,
       FlightsManagementStepBasicInfoComponent,
       FlightsManagementStepItineraryComponent,
       FlightsManagementStepScaleComponent,
       FlightsManagementStepConfirmationComponent
    ],
    imports: [
    CommonModule,
    OverlayPanelModule,
    FlightsRoutingModule,
    CarouselModule,
    SharedModule,
    StepsModule,
    PaginatorModule,
    FormsModule
]
  })
  export class FlightsManagementModule { }