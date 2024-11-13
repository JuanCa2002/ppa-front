import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-municipalities-management',
  templateUrl: './municipalities-management.component.html',
  styleUrl: './municipalities-management.component.css'
})
export class MunicipalitiesManagementComponent implements OnInit{

  public stateComponent: string  = "FILTER";
    public title: string = "Municipalities";
    public items: MenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            { label: 'Locations'}, 
            { label: 'Municipalities' }
        ];
    }

}
