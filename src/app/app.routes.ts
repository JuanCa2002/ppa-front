import { Routes } from '@angular/router';
import { RouterConstants } from './constants/routers/router-constants';

export const routes: Routes = [
    {
        path: RouterConstants.LOCATIONS_ROUTER,
        loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule)
    },
    {
        path: RouterConstants.AIR_INFRASTRUCTURE_ROUTER,
        loadChildren: () => import('./modules/air-infrastructure/air-infrastructure.module').then(m => m.AirInfrastructureModule)
    },
    {
        path: RouterConstants.FLIGHTS_ROUTER,
        loadChildren: () => import('./modules/flights/flights.module').then(m => m.FlightsModule)
    },
    {
        path: RouterConstants.HOME_ROUTER,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: "",
        redirectTo: RouterConstants.HOME_ROUTER,
        pathMatch: "full"
    }
];
