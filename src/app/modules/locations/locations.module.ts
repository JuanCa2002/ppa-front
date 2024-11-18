import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationsRouterConstants } from '../../constants/routers/locations/locations-router-constants';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
          path:
            LocationsRouterConstants.DEPARTMENT_ROUTER,
          loadChildren: () =>
            import(
              "./department-management/department-management.module"
            ).then((m) => m.DepartmentManagementModule),
        },
        {
          path:
            LocationsRouterConstants.MUNICIPALITY_ROUTER,
          loadChildren: () =>
            import(
              "./municipalities-management/municipalities-management.module"
            ).then((m) => m.MunicipalitiesManagementModule),
        },
        {
          path: "",
          redirectTo: LocationsRouterConstants.DEPARTMENT_ROUTER,
          pathMatch: "full"
      }
    ]),
  ]
})
export class LocationsModule { }
