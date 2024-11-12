import { NgModule } from "@angular/core";
import { DepartmentManagementComponent } from "./department-management.component";
import { DepartmentManagementRoutingModule } from "./department-management.routing.module";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { DepartmentManagmentTableComponent } from "./components/department-managment-table/department-managment-table.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
      DepartmentManagementComponent,
      DepartmentManagmentTableComponent
    ],
    imports: [
        DepartmentManagementRoutingModule,
        BreadcrumbModule,
        TableModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ProgressSpinnerModule,
        DividerModule,
        DialogModule,
        ToastModule
    ]
  })
  export class DepartmentManagementModule { }
  