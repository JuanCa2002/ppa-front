import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';


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
    CommonModule,
    BreadcrumbModule,
  ],
  declarations: [
  ],
})
export class PpaAdmModule { }
