import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MunicipalitiesManagementTableComponent } from './components/municipalities-management-table/municipalities-management-table.component';

@Component({
  selector: 'app-municipalities-management',
  templateUrl: './municipalities-management.component.html',
  styleUrl: './municipalities-management.component.css'
})
export class MunicipalitiesManagementComponent implements OnInit{

    public stateComponent: string  = "FILTER";
    public title: string = "Municipalities";
    public items: MenuItem[] | undefined;
    @ViewChild("municipalitiesTable") municipalitiesTable!: MunicipalitiesManagementTableComponent;

    ngOnInit(): void {
        this.items = [
            { label: 'Locations'}, 
            { label: 'Municipalities' }
        ];
    }

    public filter(filter: any){
      this.municipalitiesTable.loadMunicipalities(filter);
    }

}
