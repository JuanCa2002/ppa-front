import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
          path:
            "department-management",
          loadChildren: () =>
            import(
              "./department-management/department-management.module"
            ).then((m) => m.DepartmentManagementModule),
        },
        {
          path:
            "municipalities-management",
          loadChildren: () =>
            import(
              "./municipalities-management/municipalities-management.module"
            ).then((m) => m.MunicipalitiesManagementModule),
        },
        {
          path: "",
          redirectTo: "department-management",
          pathMatch: "full"
      }
    ]),
  ]
})
export class LocationsModule { }
