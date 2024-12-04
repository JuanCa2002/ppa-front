import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '../../../../../../../dtos/locations/department-management/department.dto';
import { MessageService } from 'primeng/api';
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

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    private departmentApiService: DepartmentApiService, private municipalityApiService: MunicipalityApiService,
    private airportApiService: AirportApiService, private airlineApiService: AirlineApiService,
    private airplaneApiService: AirplaneApiService
  ){}

  ngOnInit(): void {
    this.getDepartments('NO_APPLY');
    this.getAirlines();
    this.initializeForm();
  }

  public initializeForm(){
    this.formInformationOrigin = this.fb.group({
      departmentOriginId: [null, Validators.required],
      originId: [null, Validators.required],
      airportOriginId: [null, Validators.required] 
    });

    this.formInformationDestiny = this.fb.group({
      departmentDestinyId: [null, Validators.required],
      destinyId: [null, Validators.required],
      airportDestinyId: [null, Validators.required] 
    });

    this.formOtherDetails = this.fb.group({
      price: [null, Validators.required],
      airlineId: [null, Validators.required],
      airplaneId: [null, Validators.required]
    });
  }

  public getAirlines(event?: any){
    const filter = new AirlineFilterDTO();
    filter.state = State.ACTIVE;
    filter.name = event ? event.filter : undefined;
    this.airlineApiService.getPaginatedAirlines$(filter).subscribe((response) =>{
      this.airlines = response.data;
    }, error=>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
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
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
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
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public getLocations(type: LocationType, event: any){
    const filter = new MunicipalityDTO();
    filter.departmentId = event.value;
    filter.state = State.ACTIVE;
    if(filter.departmentId && filter.departmentId!=null){
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
  }

  public getAirports(type: LocationType, event: any){
    const filter = new AirportFilterDTO();
    filter.departmentId = this.formInformationOrigin.get('departmentId')?.value;
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
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      })
    }
  }

}
