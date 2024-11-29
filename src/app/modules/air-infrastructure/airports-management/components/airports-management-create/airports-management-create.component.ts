import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '../../../../../dtos/locations/department-management/department.dto';
import { MunicipalityDTO } from '../../../../../dtos/locations/municipalities-management/municipality.dto';
import { DepartmentFilterDTO } from '../../../../../dtos/locations/department-management/department-filter.dto';
import { State } from '../../../../../enums/ppa-adm/state';
import { DepartmentApiService } from '../../../../locations/department-management/services/department-api.service';
import { MunicipalityApiService } from '../../../../locations/municipalities-management/services/municipality-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { AirportApiService } from '../../services/airport-api.service';
import { AirportDTO } from '../../../../../dtos/air-infrastructure/airports-management/airport-dto';
import { AirportMessagesConstants } from '../../../../../constants/messages/air-infrastructure/airport-messages-constants';

@Component({
  selector: 'app-airports-management-create',
  templateUrl: './airports-management-create.component.html',
  styleUrl: './airports-management-create.component.css'
})
export class AirportsManagementCreateComponent implements OnInit{

  public formSaveAirport!: FormGroup;
  public states: any = [];
  public departments: DepartmentDto[] = [];
  public locations: MunicipalityDTO[] = [];
  @Input() public airport?: AirportDTO;
  @Input() public isUpdate!: boolean;
  @Output() onGoBack = new EventEmitter(); 

  constructor(private fb: FormBuilder, private departmentApiService: DepartmentApiService, 
    private municipalityApiService: MunicipalityApiService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private airportApiService: AirportApiService){}

  ngOnInit(): void {
    if(this.isUpdate) this.getLocations();
    this.initializeForm();
    this.getDepartments(this.isUpdate ? {filter: this.airport?.departmentName}: undefined);
    this.states = [
      {value: State.ALLOWED, label: 'Allowed'},
      {value: State.OUT_OF_SERVICE, label: 'Out of service'},
      {value: State.BUSY, label: 'Busy'}
    ]
  }

  private comeBack(){
    this.onGoBack.emit();
  }

  private save(){
    const newAirport = this.formSaveAirport.value as AirportDTO;
    newAirport.name = newAirport.name?.toUpperCase();
    this.airportApiService.postAirports$(newAirport).subscribe(() =>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: AirportMessagesConstants.AIRPORT_CREATED_SUCCESS_MESSAGE});
      this.comeBack();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  private updateState(){
    console.log( this.formSaveAirport.get('state')?.value);
    this.airportApiService.patchAirports$(this.airport?.id!, this.formSaveAirport.get('state')?.value).subscribe(() =>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: AirportMessagesConstants.AIRPORT_UPDATED_SUCCESS_MESSAGE});
      this.comeBack();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  private update(){
    const updatedAirport = this.formSaveAirport.value as AirportDTO;
    updatedAirport.name = updatedAirport.name?.toUpperCase();
    updatedAirport.id = this.airport?.id;
    this.airportApiService.putAirports$(updatedAirport).subscribe(() =>{
      if(this.airport?.state != updatedAirport.state){
        this.updateState();
        return;
      } 
      this.messageService.add({severity: 'success', summary: 'Success', detail: AirportMessagesConstants.AIRPORT_UPDATED_SUCCESS_MESSAGE});
      this.comeBack();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public openConfirmSave() {  
    const message = ((this.isUpdate) ? (GeneralMessagesConstants.GENERAL_UPDATE_MESSAGE + ' this' ) : GeneralMessagesConstants.GENERAL_CREATE_MESSAGE) + ' Airport?';
    const header = ((this.isUpdate) ? GeneralMessagesConstants.UPDATE_HEADER_MESSAGE : GeneralMessagesConstants.NEW_HEADER_MESSAGE) + ' Airport';
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
           this.isUpdate ? this.update() : this.save();
        },
    });
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
           this.comeBack();
        },
    });
  }

  public openConfirmCancel() {  
    this.confirmationService.confirm({
        message: GeneralMessagesConstants.GENERAL_CANCEL_MESSAGE,
        header: GeneralMessagesConstants.CANCEL_HEADER_MESSAGE,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
           this.comeBack();
        },
    });
  }

  private initializeForm(){
    this.formSaveAirport = this.fb.group({
      name: [this.isUpdate ? this.airport?.name: null, Validators.required],
      departmentId: [this.isUpdate ? this.airport?.departmentId: null, Validators.required],
      locationId: [this.isUpdate ? this.airport?.locationId: null, Validators.required],
      address: [this.isUpdate ? this.airport?.address: null, Validators.required],
      state: [this.isUpdate ? this.airport?.state: State.ALLOWED, Validators.required]
    })
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

  public getLocations(event?: any){
    const filter = new MunicipalityDTO();
    filter.departmentId = event ? event.value: this.airport?.departmentId;
    filter.state = State.ACTIVE;
    this.municipalityApiService.getMunicipalities$(filter).subscribe((response) =>{
      this.locations = response;
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
}

}
