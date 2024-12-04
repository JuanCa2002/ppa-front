import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FlightsManagementSearchResultComponent } from './components/flights-management-search-result/flights-management-search-result.component';

@Component({
  selector: 'app-flights-management',
  templateUrl: './flights-management.component.html',
  styleUrl: './flights-management.component.css'
})
export class FlightsManagementComponent implements OnInit{

  public stateComponent: string = 'FILTER';
  public title: string = 'Flights';
  public items: MenuItem[]  | undefined;
  @ViewChild('showResultsPanel') showResultsPanel!: FlightsManagementSearchResultComponent;

  ngOnInit(): void {
    this.items = [
      { label: 'Flights'}
    ];
  }

  public filter(event: any){
    this.showResultsPanel.getFlights(event);
  }

  public save(){
    this.items?.push({label: 'Create New Fight'});
    this.stateComponent = 'SAVE';
    this.title = 'Create New Flight';
  }


}
