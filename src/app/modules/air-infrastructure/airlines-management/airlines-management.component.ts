import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AirlinesManagementTableComponent } from './components/airlines-management-table/airlines-management-table.component';

@Component({
  selector: 'app-airlines-management',
  templateUrl: './airlines-management.component.html',
  styleUrl: './airlines-management.component.css'
})
export class AirlinesManagementComponent implements OnInit{
  public stateComponent: string = 'FILTER';
  public title: string = 'Airlines';
  public items: MenuItem[]  | undefined;
  @ViewChild('airlinesTable') airlinesTable!: AirlinesManagementTableComponent;

  ngOnInit(): void {
    this.items = [
      { label: 'Air Infrastructure'}, 
      { label: 'Airlines' }
    ];
  }

  public filterAirlines(filter: any){
    this.airlinesTable.loadAirlines(null, filter);
  }

  public createNewAirline(){
    this.airlinesTable.openSaveDialog();
  }

}
