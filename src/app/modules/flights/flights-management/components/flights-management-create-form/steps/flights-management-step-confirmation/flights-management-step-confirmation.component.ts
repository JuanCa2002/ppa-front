import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { FlightDataService } from '../../../../services/flight-data.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FlightDTO } from '../../../../../../../dtos/flights/flight-management/flight-dto';
import { AirportApiService } from '../../../../../../air-infrastructure/airports-management/services/airport-api.service';
import { AirportDTO } from '../../../../../../../dtos/air-infrastructure/airports-management/airport-dto';
import { LocationType } from '../../../../types/type-location.type';
import { AirplaneApiService } from '../../../../../../air-infrastructure/airplanes-management/services/airplane-api.service';
import { AirplaneDTO } from '../../../../../../../dtos/air-infrastructure/airplanes-management/airplane-dto';
import { ItineraryApiService } from '../../../../services/itinerary-api.service';
import { ScaleApiService } from '../../../../services/scale-api.service';
import { FlightApiService } from '../../../../services/flight-api.service';
import { FlightMessagesConstants } from '../../../../../../../constants/messages/flights/flight-messages-constants';
import { DatePipe } from '@angular/common';
import { catchError, concatMap, from, tap } from 'rxjs';
import { ScaleDTO } from '../../../../../../../dtos/flights/flight-management/scale-dto';

@Component({
  selector: 'app-flights-management-step-confirmation',
  templateUrl: './flights-management-step-confirmation.component.html',
  styleUrl: './flights-management-step-confirmation.component.css',
  providers: [DatePipe]
})
export class FlightsManagementStepConfirmationComponent implements OnInit{
    public cacheFlight!: FlightDTO;
    public originAirport!: AirportDTO;
    public destinyAirport!: AirportDTO;
    public airplaneFlight!: AirplaneDTO;
    public updateFlag!: boolean;
    public messages: Message[] = [];
    @Input() public isShowInfo: boolean = false;
    @Output() onCancel = new EventEmitter();
    @Output() onBack = new EventEmitter();
    @Output() onPreviousStep = new EventEmitter();

    constructor(private flightDataService: FlightDataService, private confirmationService: ConfirmationService,
      private airportApiService: AirportApiService, private airplaneApiService: AirplaneApiService, private messageService: MessageService,
      private itineraryApiService: ItineraryApiService, private scaleApiService: ScaleApiService, private flightApiService: FlightApiService,
      private datePipe: DatePipe
    ){}

    ngOnInit(): void {
      this.updateFlag = this.flightDataService.getFlag();
      this.cacheFlight = this.flightDataService.getCacheFligth()!;
      this.getAirportInformation(this.cacheFlight!.itinerary!.destinyId!, 'DESTINY');
      this.getAirportInformation(this.cacheFlight!.itinerary!.originId!, 'ORIGIN');
      this.getAirplaneInformation(this.cacheFlight.airplaneId!);
      this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.DIRECT_FLIGHT}];
    }

    private getAirportInformation(id: number, type: LocationType){
      this.airportApiService.getAirportById(id).subscribe(data => {
        (type === 'DESTINY') ? this.destinyAirport = data : this.originAirport = data;
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    private getAirplaneInformation(id: number){
      this.airplaneApiService.getAirplaneById$(id).subscribe(data => {
        this.airplaneFlight = data;
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    private saveItinerary(){
      const itinerary = {...this.cacheFlight.itinerary!};
      itinerary.arrivalDate = this.datePipe.transform(itinerary.arrivalDate, 'yyyy-MM-dd')!;
      itinerary.exitDate = this.datePipe.transform(itinerary.exitDate, 'yyyy-MM-dd')!;
      itinerary.exitTime = this.datePipe.transform(itinerary.exitTime, 'HH:mm') + ':00';
      itinerary.arrivalTime = this.datePipe.transform(itinerary.arrivalTime, 'HH:mm') + ':00';
      this.itineraryApiService.postItinerary(itinerary).subscribe(response => {
        (this.cacheFlight.scales!.length > 0 ) ? this.saveScales(response.id!): this.saveFlight(response.id!);
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    private putItinerary(){
      const previousScales: ScaleDTO[] = this.flightDataService.getPreviousScales();
      const itinerary = {...this.cacheFlight.itinerary!};
      itinerary.arrivalDate = this.datePipe.transform(itinerary.arrivalDate, 'yyyy-MM-dd')!;
      itinerary.exitDate = this.datePipe.transform(itinerary.exitDate, 'yyyy-MM-dd')!;
      itinerary.exitTime = this.datePipe.transform(itinerary.exitTime, 'HH:mm') + ':00';
      itinerary.arrivalTime = this.datePipe.transform(itinerary.arrivalTime, 'HH:mm') + ':00';
      this.itineraryApiService.putItinerary(itinerary).subscribe(response => {
         (previousScales.length > 0) ? this.deleteAllScales(previousScales.map(s => s.id!),response.id!) : this.putFlight(response.id!);
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    private saveScales(itineraryId: number){
      const requests = this.cacheFlight!.scales!.map(s => {
        return {
          ...s,
          itineraryId: itineraryId
        };
      });
      this.scaleApiService.postScales(requests).subscribe(() => {
        if(!this.updateFlag){
          this.saveFlight(itineraryId);
          return;
        }
        this.messageService.add({severity: 'success', summary: 'Success', detail: FlightMessagesConstants.FLIGHT_UPDATED_SUCCESS_MESSAGE});
        this.flightDataService.removeData();
        this.onCancel.emit();
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    private deleteAllScales(scaleIds: number[], itineraryId: number) {
      from(scaleIds).pipe(
        concatMap(id => 
          this.scaleApiService.deleteScale(id).pipe(
            catchError(error => {
              throw error; 
            })
          )
        )
      ).subscribe({
        next: () => {
          this.putFlight(itineraryId);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message});
        }
      });
    }


    private saveFlight(itineraryId: number){
      this.cacheFlight.itineraryId = itineraryId;
      this.flightApiService.postFlight$(this.cacheFlight).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: FlightMessagesConstants.FLIGHT_CREATED_SUCCESS_MESSAGE});
        this.flightDataService.removeData();
        this.onCancel.emit();
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    private putFlight(itineraryId: number){
      this.cacheFlight.itineraryId = itineraryId;
      this.flightApiService.putFlight$(this.cacheFlight).subscribe(() => {
        if(this.cacheFlight.scales!.length > 0){
          this.saveScales(itineraryId);
          return;
        }
        this.flightDataService.removeData();
        this.onCancel.emit();
        this.messageService.add({severity: 'success', summary: 'Success', detail: FlightMessagesConstants.FLIGHT_UPDATED_SUCCESS_MESSAGE});
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }

    public openConfirmReturn() {  
      this.confirmationService.confirm({
          message: GeneralMessagesConstants.GENERAL_RETURN_MESSAGE,
          header: GeneralMessagesConstants.RETURN_HEADER_MESSAGE,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
             this.flightDataService.removeData();
             this.onBack.emit();
          },
      });
    }

    public cancelCreate(){
      const message = GeneralMessagesConstants.GENERAL_CANCEL_MESSAGE;
      const header =  GeneralMessagesConstants.CANCEL_HEADER_MESSAGE;
      this.confirmationService.confirm({
              message: message,
              header: header,
              icon: 'pi pi-exclamation-triangle',
              acceptIcon: "none",
              rejectIcon: "none",
              rejectButtonStyleClass: "p-button-text",
              accept: () => {
                this.flightDataService.removeData();
                this.onCancel.emit();
              }
        });
    } 

    public confirmCreate(){
      const message = (this.updateFlag ? GeneralMessagesConstants.GENERAL_UPDATE_MESSAGE : GeneralMessagesConstants.GENERAL_CREATE_MESSAGE) + ' flight?';
      const header = (this.updateFlag ? GeneralMessagesConstants.UPDATE_HEADER_MESSAGE + ' this ': GeneralMessagesConstants.NEW_HEADER_MESSAGE)  + ' Flight';
      this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          (this.updateFlag) ? this.putItinerary() : this.saveItinerary();
        }
      });
    }

}
