import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AirplanesManagamentTableShowComponent } from './components/airplanes-managament-table-show/airplanes-managament-table-show.component';

@Component({
  selector: 'app-airplanes-management',
  templateUrl: './airplanes-management.component.html',
  styleUrl: './airplanes-management.component.css'
})
export class AirplanesManagementComponent implements OnInit{
  public stateComponent: string = 'FILTER';
  public title: string = 'Airplanes';
  public items: MenuItem[]  | undefined;
  @ViewChild("airplanesTable") airplanesTable!: AirplanesManagamentTableShowComponent;

  ngOnInit(): void {
    this.items = [
      { label: 'Air Infrastructure'}, 
      { label: 'Airplanes' }
    ];
  }

  public filter(event: any){
    this.airplanesTable.filterAirplanes(undefined, event);
  }

  public save(){
    this.airplanesTable.showNew();
  }

}
