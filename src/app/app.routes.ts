import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "ppa-adm",
        loadChildren: () => import('./modules/ppa-adm/ppa-adm.module').then(m => m.PpaAdmModule)
    },
    {
        path: "",
        redirectTo: "ppa-adm",
        pathMatch: "full"
    }
];
