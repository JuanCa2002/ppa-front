import { Component, OnInit } from '@angular/core';
import { FlightDTO } from '../../../../../dtos/flights/flight-management/flight-dto';
import { FlightApiService } from '../../services/flight-api.service';
import { FlightFilterDTO } from '../../../../../dtos/flights/flight-management/flight-filter.dto';
import { Message, MessageService } from 'primeng/api';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';

@Component({
  selector: 'app-flights-management-search-result',
  templateUrl: './flights-management-search-result.component.html',
  styleUrl: './flights-management-search-result.component.css'
})
export class FlightsManagementSearchResultComponent implements OnInit{
  public flights: FlightDTO[] = [];
  public showData: boolean = false;
  public messages: Message[] = [];

  constructor(private flightApiService: FlightApiService, private messageService: MessageService){}

  ngOnInit(): void {
    this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_FILTER_MESSAGE }];
  }

  public getFlights(filter: FlightFilterDTO){
    this.flightApiService.getPaginatedFlights$(filter).subscribe((response) =>{
      if(response.data.length > 0){
        this.flights = response.data;
        this.showData = true;
        return;
      }
      this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}];
      this.showData = false;
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })

  }

}
