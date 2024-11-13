import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.css'
})
export class DepartmentManagementComponent implements OnInit{
    public stateComponent: string  = "FILTER";
    public title: string = "Departments";
    public items: MenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            { label: 'Admin' }, 
            { label: 'Departments' }
        ];
    }

    


}
