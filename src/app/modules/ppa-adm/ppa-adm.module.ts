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
          path: "",
          redirectTo: "department-management",
          pathMatch: "full"
      }
    ]),
  ]
})
export class PpaAdmModule { }
