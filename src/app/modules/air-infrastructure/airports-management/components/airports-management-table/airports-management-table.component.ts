import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AirportDTO } from '../../../../../dtos/air-infrastructure/airports-management/airport-dto';
import { AirportApiService } from '../../services/airport-api.service';
import { AirportFilterDTO } from '../../../../../dtos/air-infrastructure/airports-management/airport-filter-dto';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { Message, MessageService } from 'primeng/api';
import { State } from '../../../../../enums/ppa-adm/state';

@Component({
  selector: 'app-airports-management-table',
  templateUrl: './airports-management-table.component.html',
  styleUrl: './airports-management-table.component.css'
})
export class AirportsManagementTableComponent implements OnInit{
  
  public rows: number = 10;
  public totalRecords: number = 0;
  public showTable: boolean = false;
  public airports: AirportDTO[] = [];
  public messages: Message[] = [];
  public cache: AirportFilterDTO = new AirportFilterDTO;
  @Output() onUpdate = new EventEmitter<AirportDTO>();

  constructor(private airportApiService: AirportApiService, private messageService: MessageService){}

  ngOnInit(): void {
    this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_FILTER_MESSAGE }];
  }

  public editAirport(airport: AirportDTO){
    this.onUpdate.emit(airport);
  }

  public filterAirports(event?: any, filter?: any){
    const filterComplete = filter ? filter : this.cache;
      if (event) {
        filterComplete.skip = event.first;
        filterComplete.rowsPerPage = event.rows;
      }
    this.airportApiService.getPaginatedAirports$(filterComplete).subscribe(response =>{
        if(response.data.length > 0){
          this.airports = response.data;
          this.totalRecords = response.total;
          this.showTable = true;
          this.cache = filterComplete;
          return;
        }
        this.showTable = false;
        this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}];
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }


  public getStyleState(state: string): string{
    if(state == State.ALLOWED){
      return 'state-active';
    }else if(state == State.OUT_OF_SERVICE){
      return 'state-inactive';
    }
    return 'state-medium'
  }

}
