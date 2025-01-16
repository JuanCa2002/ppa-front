import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '../../../../../../../dtos/locations/department-management/department.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartmentApiService } from '../../../../../../locations/department-management/services/department-api.service';
import { DepartmentFilterDTO } from '../../../../../../../dtos/locations/department-management/department-filter.dto';
import { LocationType } from '../../../../types/type-location.type';
import { State } from '../../../../../../../enums/ppa-adm/state';
import { MunicipalityDTO } from '../../../../../../../dtos/locations/municipalities-management/municipality.dto';
import { MunicipalityApiService } from '../../../../../../locations/municipalities-management/services/municipality-api.service';
import { AirportFilterDTO } from '../../../../../../../dtos/air-infrastructure/airports-management/airport-filter-dto';
import { AirportApiService } from '../../../../../../air-infrastructure/airports-management/services/airport-api.service';
import { AirportDTO } from '../../../../../../../dtos/air-infrastructure/airports-management/airport-dto';
import { AirlineDTO } from '../../../../../../../dtos/air-infrastructure/airlines-management/airline-dto';
import { AirlineApiService } from '../../../../../../air-infrastructure/airlines-management/services/airline-api.service';
import { AirlineFilterDTO } from '../../../../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto';
import { AirplaneDTO } from '../../../../../../../dtos/air-infrastructure/airplanes-management/airplane-dto';
import { AirplaneApiService } from '../../../../../../air-infrastructure/airplanes-management/services/airplane-api.service';
import { AirplaneFilterDTO } from '../../../../../../../dtos/air-infrastructure/airplanes-management/airplane-filter-dto';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { FlightDataService } from '../../../../services/flight-data.service';
import { FlightDTO } from '../../../../../../../dtos/flights/flight-management/flight-dto';
import { ItineraryDTO } from '../../../../../../../dtos/flights/flight-management/itinerary-dto';
import { FlightMessagesConstants } from '../../../../../../../constants/messages/flights/flight-messages-constants';

@Component({
  selector: 'app-flights-management-step-basic-info',
  templateUrl: './flights-management-step-basic-info.component.html',
  styleUrl: './flights-management-step-basic-info.component.css'
})
export class FlightsManagementStepBasicInfoComponent implements OnInit{

  public formInformationOrigin!: FormGroup;
  public formInformationDestiny!: FormGroup;
  public formOtherDetails!: FormGroup;
  public departmentsOrigins: DepartmentDto [] = [];
  public departmentsDestinations: DepartmentDto [] = [];
  public origins: MunicipalityDTO [] = [];
  public destinations: MunicipalityDTO [] = [];
  public airportsOrigins: AirportDTO [] = [];
  public airportsDestinations: AirportDTO [] = [];
  public airlines: AirlineDTO [] = [];
  public airplanes: AirplaneDTO [] = [];
  public cacheFlight: FlightDTO | null = null;
  @Output() onNextStep = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private departmentApiService: DepartmentApiService, private municipalityApiService: MunicipalityApiService,
    private airportApiService: AirportApiService, private airlineApiService: AirlineApiService,
    private airplaneApiService: AirplaneApiService, private confirmationService: ConfirmationService,
    private flightDataService: FlightDataService
  ){}

  ngOnInit(): void {
    this.getDepartments('NO_APPLY');
    this.getAirlines();
    this.initializeForm();
  }

  public initializeForm(){
    this.cacheFlight = this.flightDataService.getCacheFligth();
    this.setDropdowns(this.cacheFlight?.itinerary,  this.cacheFlight?.airlineId);
    const itinerary = this.cacheFlight != null ? this.cacheFlight.itinerary : null;
    this.formInformationOrigin = this.fb.group({
      departmentOriginId: [itinerary != null ? itinerary.departmentOriginId : null, Validators.required],
      originId: [itinerary != null ? itinerary.originPlaceId : null, Validators.required],
      airportOriginId: [itinerary != null ? itinerary.originId : null, Validators.required] 
    });

    this.formInformationDestiny = this.fb.group({
      departmentDestinyId: [itinerary != null ? itinerary.departmentDestinyId : null, Validators.required],
      destinyId: [itinerary != null ? itinerary.destinyPlaceId : null, Validators.required],
      airportDestinyId: [itinerary != null ? itinerary.destinyId : null, Validators.required] 
    });

    this.formOtherDetails = this.fb.group({
      price: [this.cacheFlight != null ? this.cacheFlight.price : null, Validators.required],
      airlineId: [this.cacheFlight != null ? this.cacheFlight.airlineId : null, Validators.required],
      airplaneId: [this.cacheFlight != null ? this.cacheFlight.airplaneId : null, Validators.required]
    });
  }

  private setDropdowns(itinerary: ItineraryDTO | undefined, airlineId?: number){
    if(itinerary && airlineId){
      this.getLocations('DESTINY',true ,{value: itinerary.departmentDestinyId});
      this.getLocations('ORIGIN', true, {value: itinerary.departmentOriginId});
      this.getAirports('DESTINY', {value: itinerary.destinyPlaceId});
      this.getAirports('ORIGIN', {value: itinerary.originPlaceId});
      this.getAirplanes({value: airlineId});
    }
  }

  public isValidForm(): boolean {
     return this.formInformationDestiny.valid && this.formInformationOrigin.valid && this.formOtherDetails.valid;
  }

  public getAirlines(event?: any){
    const filter = new AirlineFilterDTO();
    filter.state = State.ACTIVE;
    filter.name = event ? event.filter : undefined;
    this.airlineApiService.getPaginatedAirlines$(filter).subscribe((response) =>{
      this.airlines = response.data;
    }, error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public getAirplanes(event?: any){
    const filter = new AirplaneFilterDTO();
    filter.state = State.ACTIVE;
    filter.rowsPerPage = 0;
    filter.skip = 0;
    filter.airlineId = event.value;
    this.airplaneApiService.getPaginatedAirplanes$(filter).subscribe((response) =>{
      this.airplanes = response.data;
    }, error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public getDepartments(type: LocationType, event?: any){
    const filter = new DepartmentFilterDTO();
    filter.state = State.ACTIVE;
    filter.name = event ? event.filter : undefined;
    this.departmentApiService.getPaginatedDepartments$(filter).subscribe((response) =>{
      if(type == 'DESTINY'){
        this.departmentsDestinations = response.data;
      }else if(type == 'ORIGIN'){
        this.departmentsOrigins = response.data;
      }else {
        this.departmentsDestinations = response.data;
        this.departmentsOrigins = response.data;
      }
    }, error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public getLocations(type: LocationType, isCache: boolean, event: any){
    const filter = new MunicipalityDTO();
    filter.departmentId = event.value;
    filter.state = State.ACTIVE;
    if(filter.departmentId && filter.departmentId!=null){
      this.municipalityApiService.getMunicipalities$(filter).subscribe((response) =>{
        if(type == 'DESTINY'){
          this.destinations = response;
          if(!isCache){
            this.airportsDestinations = [];
            this.formInformationOrigin.get('airportDestinyId')?.setValue(undefined)
          }
        }else{
          this.origins = response;
          if(!isCache){
            this.airportsOrigins = [];
            this.formInformationOrigin.get('airportOriginId')?.setValue(undefined)  
          }
        }
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }
  }

  public getAirports(type: LocationType, event: any){
    const filter = new AirportFilterDTO();
    filter.locationId = event.value;
    filter.state = State.ALLOWED;
    filter.rowsPerPage = 0;
    filter.skip = 0;
    if(filter.locationId && filter.locationId != null ){
      this.airportApiService.getPaginatedAirports$(filter).subscribe((response) =>{
        if(type == 'DESTINY'){
          this.airportsDestinations = response.data;
        }else{
          this.airportsOrigins = response.data;
        }
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }
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

    private validateSameLocations(){
      return (this.formInformationDestiny.get('airportDestinyId')?.value === this.formInformationOrigin.get('airportOriginId')?.value) &&
      (this.formInformationDestiny.get('destinyId')?.value === this.formInformationOrigin.get('originId')?.value) && 
      (this.formInformationDestiny.get('departmentDestinyId')?.value === this.formInformationOrigin.get('departmentOriginId')?.value);
    }

    public nextStep(){
      if(this.validateSameLocations()){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: FlightMessagesConstants.FLIGHT_ORIGIN_SAME_DESTINY_ERROR_MESSAGE});
        return;
      }
      let itinerary: ItineraryDTO = this.cacheFlight != null && this.cacheFlight.itinerary!= null ? this.cacheFlight.itinerary: new ItineraryDTO();
      let flight: FlightDTO = this.cacheFlight!= null ? this.cacheFlight : new FlightDTO();
      itinerary.destinyId = this.formInformationDestiny.get('airportDestinyId')?.value;
      itinerary.originId = this.formInformationOrigin.get('airportOriginId')?.value;
      itinerary.destinyPlaceId = this.formInformationDestiny.get('destinyId')?.value;
      itinerary.originPlaceId = this.formInformationOrigin.get('originId')?.value;
      itinerary.departmentDestinyId = this.formInformationDestiny.get('departmentDestinyId')?.value;
      itinerary.departmentOriginId = this.formInformationOrigin.get('departmentOriginId')?.value;
      flight = this.formOtherDetails.value as FlightDTO;
      flight.itinerary = itinerary;
      this.flightDataService.addData(flight);
      this.onNextStep.emit();
    }

}
