import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '../../../../../dtos/locations/department-management/department.dto';
import { MunicipalityDTO } from '../../../../../dtos/locations/municipalities-management/municipality.dto';
import { DepartmentApiService } from '../../../../locations/department-management/services/department-api.service';
import { MunicipalityApiService } from '../../../../locations/municipalities-management/services/municipality-api.service';
import { DepartmentFilterDTO } from '../../../../../dtos/locations/department-management/department-filter.dto';
import { State } from '../../../../../enums/ppa-adm/state';
import { LocationType } from '../../types/type-location.type';
import { MessageService } from 'primeng/api';
import { AirlineDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-dto';
import { AirlineFilterDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-case.pipe';
import { AirlineApiService } from '../../../../air-infrastructure/airlines-management/services/airline-api.service';
import { FlightFilterDTO } from '../../../../../dtos/flights/flight-management/flight-filter.dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flights-management-filter',
  templateUrl: './flights-management-filter.component.html',
  styleUrl: './flights-management-filter.component.css',
  providers: [CapitalizePipe, DatePipe]
})
export class FlightsManagementFilterComponent implements OnInit{

  public formFilterFlights!: FormGroup;
  public formAddFilters!: FormGroup;
  public departmentsOrigins: DepartmentDto[] = [];
  public departmentsDestinations: DepartmentDto[] = [];
  public origins: MunicipalityDTO[] = [];
  public destinations: MunicipalityDTO[] = [];
  public optionalFilters: any[] = [];
  public states: any[] = [];
  public airlines: AirlineDTO[] = [];
  @Output() onFilter = new EventEmitter<FlightFilterDTO>();
  @Output() onSave = new EventEmitter();

  constructor(private fb: FormBuilder, private departmentApiService: DepartmentApiService,
    private municipalityApiService: MunicipalityApiService, private messageService: MessageService,
    private airlineApiService: AirlineApiService, private capitalizeService: CapitalizePipe, private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.initializeForm();
    this.getDepartments('NO_APPLY');
    this.getArlines();
    this.optionalFilters = [
      {formControlName:'state', label: 'State'},
      {formControlName:'exitDate', label: 'Exit Date'},
      {formControlName:'exitTime', label: 'Exit Time'},
      {formControlName:'airlineId', label: 'Airline'},
      {formControlName:'isDirect', label: 'Has Scales?'},
    ];
    this.states = [
      { value: State.SCHEDULED, label: 'Scheduled' },
      { value: State.BOARDING, label: 'Boarding' },
      { value: State.AT_GATE, label: 'At Gate' },
      { value: State.DELAYED, label: 'Delayed' },
      { value: State.CANCELLED, label: 'Cancelled' },
      { value: State.POSTPONED, label: 'Postponed' },
      { value: State.IN_FLIGHT, label: 'In Flight' },
      { value: State.DIVERTED, label: 'Diverted' },
      { value: State.LANDED, label: 'Landed' },
      { value: State.AT_GATE_ARRIVAL, label: 'At Gate Arrival' },
      { value: State.ON_HOLD, label: 'On Hold' },
      { value: State.DEPARTED, label: 'Departed' },
      { value: State.RETURN_TO_GATE, label: 'Return to Gate' },
      { value: State.FINAL_CALL, label: 'Final Call' },
      { value: State.ARRIVED, label: 'Arrived' },
      { value: State.UNKNOWN, label: 'Unknown' }
    ]
  }

  public filter(){
    const filter = this.formFilterFlights.value as FlightFilterDTO;
    filter.rowsPerPage = 10;
    filter.skip = 0;
    filter.exitDate = filter.exitDate ? this.datePipe.transform(filter.exitDate, 'yyyy-MM-dd')!: undefined;
    if (filter.exitTime && !/^\d{2}:\d{2}:\d{2}$/.test(filter.exitTime)) {
      filter.exitTime = this.datePipe.transform(filter.exitTime, 'HH:mm') + ':00';
    }
    this.onFilter.emit(filter);
  }

  private initializeForm(){
    this.formFilterFlights = this.fb.group({
      state: [null],
      exitDate: [null],
      exitTime: [null],
      airlineId: [null],
      departmentOriginId: [null, Validators.required],
      originId: [null, Validators.required],
      departmentDestinyId: [null, Validators.required],
      destinyId: [null, Validators.required],
      isDirect: [null]
    });
    this.formAddFilters = this.fb.group({
      state: [false],
      exitDate: [false],
      exitTime: [false],
      airlineId: [false],
      isDirect: [false]
    });
  }

  public createNewRegister(){
    this.onSave.emit();
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
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public getLocations(type: LocationType, event: any){
    const filter = new MunicipalityDTO();
    filter.departmentId = event.value;
    filter.state = State.ACTIVE;
    this.municipalityApiService.getMunicipalities$(filter).subscribe((response) =>{
      if(type == 'DESTINY'){
        this.destinations = response;
      }else{
        this.origins = response;
      }
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
}

public getArlines(event?:any){
  const filter: AirlineFilterDTO = new AirlineFilterDTO();
  filter.name = event ? this.capitalizeService.transform(event.filter) : undefined;
  filter.state = State.ACTIVE;
  filter.skip = 0;
  filter.rowsPerPage = 10;
  
  this.airlineApiService.getPaginatedAirlines$(filter).subscribe((response) =>{
    this.airlines = response.data;
  }, error =>{
    this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
  })
}

public onSelectAllChange(event: any){
  Object.keys(this.formAddFilters.controls).forEach((key) => {
    this.formAddFilters.get(key)?.setValue(event.checked);
    if(!event.checked){
      this.formFilterFlights.get(key)?.setValue(undefined);
    }
  });
}

public changeValueForm(key: any, event: any){
  if(!event.checked){
    this.formFilterFlights.get(key)?.setValue(undefined);
  }
}

}
