import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "locations",
        loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule)
    },
    {
        path: "",
        redirectTo: "locations",
        pathMatch: "full"
    }
];
