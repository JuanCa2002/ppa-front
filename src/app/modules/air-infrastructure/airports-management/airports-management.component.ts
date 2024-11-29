import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AirportsManagementTableComponent } from './components/airports-management-table/airports-management-table.component';
import { AirportDTO } from '../../../dtos/air-infrastructure/airports-management/airport-dto';

@Component({
  selector: 'app-airports-management',
  templateUrl: './airports-management.component.html',
  styleUrl: './airports-management.component.css'
})
export class AirportsManagementComponent implements OnInit{

  public stateComponent: string = 'FILTER';
  public title: string = 'Airports';
  public items: MenuItem[]  | undefined;
  public isUpdate: boolean = false;
  public airport?: AirportDTO;
  @ViewChild('airportsTable') airportsTable!: AirportsManagementTableComponent;

  ngOnInit(): void {
    this.items = [
      { label: 'Air Infrastructure'}, 
      { label: 'Airports' }
    ];
  }

  public filter(event: any){
    this.airportsTable.filterAirports(undefined, event);
  }

  public comeBack(){
    this.stateComponent = 'FILTER';
    this.title = 'Airports';
    this.items?.pop();
  }

  public save(isUpdate: any){
    this.stateComponent = 'SAVE';
    this.title = 'Create New Airport';
    this.items?.push({label: 'New Airport'});
    this.isUpdate = isUpdate;
  }

  public update(airport: any){
    this.stateComponent = 'SAVE';
    this.title = 'Update Airport';
    this.items?.push({label: 'Update Airport'});
    this.airport = airport;
    this.isUpdate = true;
  }

}
