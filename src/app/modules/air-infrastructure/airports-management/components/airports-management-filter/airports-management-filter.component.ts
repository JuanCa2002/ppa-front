import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { DepartmentApiService } from '../../../../locations/department-management/services/department-api.service';
import { DepartmentDto } from '../../../../../dtos/locations/department-management/department.dto';
import { MunicipalityDTO } from '../../../../../dtos/locations/municipalities-management/municipality.dto';
import { DepartmentFilterDTO } from '../../../../../dtos/locations/department-management/department-filter.dto';
import { MessageService } from 'primeng/api';
import { MunicipalityApiService } from '../../../../locations/municipalities-management/services/municipality-api.service';
import { AirportFilterDTO } from '../../../../../dtos/air-infrastructure/airports-management/airport-filter-dto';

@Component({
  selector: 'app-airports-management-filter',
  templateUrl: './airports-management-filter.component.html',
  styleUrl: './airports-management-filter.component.css'
})
export class AirportsManagementFilterComponent implements OnInit{
  public states: any = [];
  public departments: DepartmentDto[] = [];
  public locations: MunicipalityDTO[] = [];
  public formFilterAirport!: FormGroup;
  @Output() onFilter = new EventEmitter<AirportFilterDTO>();
  @Output() onSave = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private departmentApiService: DepartmentApiService, 
    private messageService: MessageService, private municipalityApiService: MunicipalityApiService){}

  ngOnInit(): void {
    this.initializeForm();
    this.getDepartments();
    this.states = [
      {value: State.ALLOWED, label: 'Allowed'},
      {value: State.OUT_OF_SERVICE, label: 'Out of service'},
      {value: State.BUSY, label: 'Busy'}
    ]
  }

  public filter(){
    const filter = this.formFilterAirport.value as AirportFilterDTO;
    filter.skip = 0;
    filter.name = filter.name?.toUpperCase();
    filter.rowsPerPage = 10;
    this.onFilter.emit(filter);
  }

  public createNewRecord(){
    this.onSave.emit(false);
  }

  public getDepartments(event?: any){
    const filter = new DepartmentFilterDTO();
    filter.state = State.ACTIVE;
    filter.name = event ? event.filter : undefined;
    this.departmentApiService.getPaginatedDepartments$(filter).subscribe((response) =>{
      this.departments = response.data;
    }, error=>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public clearFilters(){
    this.formFilterAirport.reset();
  }

  public getLocations(event: any){
      const filter = new MunicipalityDTO();
      filter.departmentId = event.value;
      filter.state = State.ACTIVE;
      this.municipalityApiService.getMunicipalities$(filter).subscribe((response) =>{
        this.locations = response;
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      })
  }

  private initializeForm(){
    this.formFilterAirport = this.fb.group({
      name: [null],
      locationId: [null],
      departmentId: [null],
      state: [null]
    })
  }

}