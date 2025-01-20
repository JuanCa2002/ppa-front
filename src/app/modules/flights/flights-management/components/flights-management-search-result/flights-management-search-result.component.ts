import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightDTO } from '../../../../../dtos/flights/flight-management/flight-dto';
import { FlightApiService } from '../../services/flight-api.service';
import { FlightFilterDTO } from '../../../../../dtos/flights/flight-management/flight-filter.dto';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { State } from '../../../../../enums/ppa-adm/state';
import { FlightMessagesConstants } from '../../../../../constants/messages/flights/flight-messages-constants';
import { ItineraryApiService } from '../../services/itinerary-api.service';
import { ScaleApiService } from '../../services/scale-api.service';
import { FlightDataService } from '../../services/flight-data.service';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { AirportDTO } from '../../../../../dtos/air-infrastructure/airports-management/airport-dto';
import { AirportApiService } from '../../../../air-infrastructure/airports-management/services/airport-api.service';
import { LocationType } from '../../types/type-location.type';
import { ItineraryDTO } from '../../../../../dtos/flights/flight-management/itinerary-dto';
import { AirplaneApiService } from '../../../../air-infrastructure/airplanes-management/services/airplane-api.service';

@Component({
  selector: 'app-flights-management-search-result',
  templateUrl: './flights-management-search-result.component.html',
  styleUrl: './flights-management-search-result.component.css'
})

export class FlightsManagementSearchResultComponent implements OnInit{
  public flights: FlightDTO[] = [];
  public showData: boolean = false;
  public toUpdate: boolean = false;
  public cacheFilter: FlightFilterDTO = new FlightFilterDTO();
  public messages: Message[] = [];
  public states: any[] =  [];
  public state: any | null = null;
  public selectedFlight: FlightDTO | null = null;
  public showModalUpdateState: boolean = false;
  public totalRecords: number = 0;
  public first: number = 0;
  public rows: number = 10;
  @Output() onShowDetail = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  constructor(private flightApiService: FlightApiService, private messageService: MessageService,
    private itineraryApiService: ItineraryApiService, private scaleApiService: ScaleApiService,
    private flightDataService: FlightDataService, private confirmationService: ConfirmationService,
    private airportApiService: AirportApiService, private airplaneApiService: AirplaneApiService
  ){}

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

  public showDetail(flight: FlightDTO){
    this.selectedFlight = flight;
    this.toUpdate = false;
    this.getItineraryById(this.selectedFlight.itineraryId!)
  }

  public update(flight: FlightDTO){
    this.selectedFlight = flight;
    this.toUpdate = true;
    this.getItineraryById(this.selectedFlight.itineraryId!)
  }

  private getItineraryById(id: number) {
    this.itineraryApiService.getItineraryById$(id).pipe(
      switchMap(response => {
        this.selectedFlight!.itinerary = response;
  
        const destinyData$ = this.getExtraDataAirports(this.selectedFlight!.itinerary!.destinyId!, 'DESTINY');
        const originData$ = this.getExtraDataAirports(this.selectedFlight!.itinerary!.originId!, 'ORIGIN');
        const airplaneData$ = this.getExtraDataFlight(this.selectedFlight!.airplaneId!);
  
        return forkJoin([destinyData$, originData$, airplaneData$]).pipe(
          map(() => response)
        );
      })
    ).subscribe({
      next: response => {
        this.getScalesByItineraryId(response.id!);
      },
      error: error => {
        const errorMessage = error?.error?.message || 'Ocurrió un error inesperado. Intenta de nuevo más tarde.';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      }
    });
  }

  private getScalesByItineraryId(itineraryId: number){
    this.scaleApiService.getScalesByItineraryId(itineraryId).subscribe(response =>{
      this.selectedFlight!.scales = response;
      response.length > 0 ? this.getDetailsScales(): this.viewDetails();
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    });
  }

  public editState(flight: FlightDTO){
    this.state = flight.state;
    this.selectedFlight = flight;
    this.showModalUpdateState = true;
  }

  public onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getFlights(this.cacheFilter, this.rows, this.first);
  }

  private updateStateFlight(){
    this.flightApiService.patchFlight$(this.selectedFlight!.id!, this.state).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: FlightMessagesConstants.FLIGHT_UPDATE_STATE_SUCCESS_MESSAGE});
      this.showModalUpdateState = false;
      this.selectedFlight = null;
      this.getFlights(this.cacheFilter, this.rows, this.first);
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  private getExtraDataAirports(id: number, typeLocation: LocationType): Observable<AirportDTO> {
    return this.airportApiService.getAirportById(id).pipe(
      tap(data => {
        if (typeLocation === 'DESTINY') {
          this.selectedFlight!.itinerary!.destinyPlaceId = data.locationId;
          this.selectedFlight!.itinerary!.departmentDestinyId = data.departmentId;
        } else {
          this.selectedFlight!.itinerary!.originPlaceId = data.locationId;
          this.selectedFlight!.itinerary!.departmentOriginId = data.departmentId;
        }
      })
    );
  }

  private getExtraDataFlight(airplaneId: number){
      return this.airplaneApiService.getAirplaneById$(airplaneId).pipe(
            tap(data => {
              this.selectedFlight!.airlineId = data.airline?.id;
            })
      );
  }

  private getDetailsScales(){
    const requests: any = this.selectedFlight!.scales?.map((scale) =>
      this.airportApiService.getAirportById(scale.scalePlaceId!)
    );
    
    forkJoin(requests).subscribe({
      next: (responses: any) => {
        responses.forEach((airport: AirportDTO) => {
          const scale = this.selectedFlight!.scales?.find(s => s.scalePlaceId === airport.id);
    
          scale!.departmentScaleName = airport.departmentName;
          scale!.scaleMunicipalityName = airport.locationName;  
        });
        this.viewDetails();
      },
      error: (err) => {
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: err.error.message});
      }
    });      
  }

  private viewDetails(){
    this.flightDataService.addData(this.selectedFlight!);
    if(this.toUpdate){
      this.flightDataService.setIsUpdate(true);
      this.flightDataService.addPreviousScales(this.selectedFlight!.scales!);
    }
    (!this.toUpdate) ? this.onShowDetail.emit() : this.onUpdate.emit();
  }

  public confirmUpdateState(){
    const message = GeneralMessagesConstants.GENERAL_CONFIRM_STATE_MESSAGE + ' this flight?';
    const header =  GeneralMessagesConstants.UPDATE_STATE_HEADER_MESSAGE + ' Flight';
    this.confirmationService.confirm({
            message: message,
            header: header,
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
              this.updateStateFlight();
            }
          });
    }

}
