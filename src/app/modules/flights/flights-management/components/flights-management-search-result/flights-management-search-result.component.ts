import { Component, OnInit } from '@angular/core';
import { FlightDTO } from '../../../../../dtos/flights/flight-management/flight-dto';
import { FlightApiService } from '../../services/flight-api.service';
import { FlightFilterDTO } from '../../../../../dtos/flights/flight-management/flight-filter.dto';
import { Message, MessageService } from 'primeng/api';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { State } from '../../../../../enums/ppa-adm/state';

@Component({
  selector: 'app-flights-management-search-result',
  templateUrl: './flights-management-search-result.component.html',
  styleUrl: './flights-management-search-result.component.css'
})

export class FlightsManagementSearchResultComponent implements OnInit{
  public flights: FlightDTO[] = [];
  public showData: boolean = false;
  public cacheFilter: FlightFilterDTO = new FlightFilterDTO();
  public messages: Message[] = [];
  public states: any[] =  [];
  public totalRecords: number = 0;
  public first: number = 0;
  public rows: number = 10;

  constructor(private flightApiService: FlightApiService, private messageService: MessageService){}

  ngOnInit(): void {
    this.states = [
          { value: State.SCHEDULED, label: 'Scheduled', color: '#007bff'},
          { value: State.BOARDING, label: 'Boarding',color: '#28a745'},
          { value: State.AT_GATE, label: 'At Gate',  color: '#17a2b8' },
          { value: State.DELAYED, label: 'Delayed', color: '#ffc107' },
          { value: State.CANCELLED, label: 'Cancelled', color: '#dc3545' },
          { value: State.POSTPONED, label: 'Postponed', color: '#fd7e14' },
          { value: State.IN_FLIGHT, label: 'In Flight', color: '#6610f2' },
          { value: State.DIVERTED, label: 'Diverted', color: '#6c757d' },
          { value: State.LANDED, label: 'Landed', color: '#20c997' },
          { value: State.AT_GATE_ARRIVAL, label: 'At Gate Arrival', color: '#007bff' },
          { value: State.ON_HOLD, label: 'On Hold', color: '#6c757d' },
          { value: State.DEPARTED, label: 'Departed', color: '#6f42c1' },
          { value: State.RETURN_TO_GATE, label: 'Return to Gate', color: '#dc3545'},
          { value: State.FINAL_CALL, label: 'Final Call',color: '#ffc107' },
          { value: State.ARRIVED, label: 'Arrived', color: '#28a745' },
          { value: State.UNKNOWN, label: 'Unknown', color: '#343a40' }
        ]
    this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_FILTER_MESSAGE }];
  }

  public getFlights(filter: FlightFilterDTO, rowsPerPage?: number, skip?: number){
    filter.rowsPerPage = rowsPerPage ? rowsPerPage: 10;
    filter.skip = skip ? skip: 0;
    this.cacheFilter = filter;
    this.flightApiService.getPaginatedFlights$(filter).subscribe((response) =>{
      if(response.data.length > 0){
        this.flights = response.data;
        this.totalRecords = response.total;
        this.showData = true;
        return;
      }
      this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}];
      this.showData = false;
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })

  }

  public findColor(state: string): string{
    const foundState = this.states.find(s => s.value === state);

    if (foundState) {
      return foundState.color;
    }
    return '#ffffff';
  }

  public findLabel(state: string): string {
    const foundState = this.states.find(s => s.value === state);

    if (foundState) {
      return foundState.label;
    }
    return "Label not found";
  }

  public onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getFlights(this.cacheFilter, this.rows, this.first);
  }

}
