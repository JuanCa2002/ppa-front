import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.css'
})
export class DepartmentManagementComponent {

    public items: MenuItem[] | undefined;
    public home: MenuItem | undefined;
    public stateComponent: string  = "FILTER";

    ngOnInit() {
        this.items = [
            { label: 'Ppa-adm' }, 
            { label: 'Departments' },
            { label: 'Department Management'}
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

}
