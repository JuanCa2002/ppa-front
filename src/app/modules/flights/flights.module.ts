import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FlightsRouterConstants } from "../../constants/routers/flights/flights-router-constants";

@NgModule({
    imports: [
      RouterModule.forChild([
        {
            path: FlightsRouterConstants.FLIGHTS_ROUTER,
            loadChildren: () => import("./flights-management/flights-management.module").then((m) => m.FlightsManagementModule)
        },
        {
            path: "",
            redirectTo: FlightsRouterConstants.FLIGHTS_ROUTER,
            pathMatch: "full"
        }
      ])
    ]
  })
export class FlightsModule { }