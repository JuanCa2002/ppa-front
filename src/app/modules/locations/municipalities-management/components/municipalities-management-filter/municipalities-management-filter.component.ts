import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { DepartmentApiService } from '../../../department-management/services/department-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartmentDto } from '../../../../../dtos/locations/department-management/department.dto';
import { DepartmentFilterDTO } from '../../../../../dtos/locations/department-management/department-filter.dto';
import { MunicipalityDTO } from '../../../../../dtos/locations/municipalities-management/municipality.dto';
import { MunicipalityApiService } from '../../services/municipality-api.service';
import { MunicipalityMessagesConstants } from '../../../../../constants/messages/locations/municipality-messages-constants';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';

@Component({
  selector: 'app-municipalities-management-filter',
  templateUrl: './municipalities-management-filter.component.html',
  styleUrl: './municipalities-management-filter.component.css'
})
export class MunicipalitiesManagementFilterComponent implements OnInit{

  public formFilterMunicipalities!: FormGroup;
  public formSaveMunicipality!:FormGroup;
  public states: any[] = [];
  public departments: DepartmentDto[] = [];
  public showModalNew: boolean = false;
  @Output() onFilter = new EventEmitter<MunicipalityDTO>();
   
  constructor(private fb: FormBuilder, private departmentApiService: DepartmentApiService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private municipalityApiService: MunicipalityApiService
  ){}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDepartments();
    this.onInputChange();
    this.states = [
      {value: State.ACTIVE, label: 'Active'},
      {value: State.INACTIVE, label: 'Inactive'},
    ]
  }

  private initializeForm(){
    this.formFilterMunicipalities = this.fb.group({
      name: null,
      state: null,
      departmentId: [null, Validators.required]
    });
    this.formSaveMunicipality = this.fb.group({
      name: [null, Validators.required],
      departmentId:[null, Validators.required]
    })
  }

  public clear(){
    this.formFilterMunicipalities.reset();
  }

  public filter(){
    const municipalityFilter = this.formFilterMunicipalities.value as MunicipalityDTO;
    this.onFilter.emit(municipalityFilter);
  }

  public loadDepartments(event?: any){
    const filter: DepartmentFilterDTO = new DepartmentFilterDTO();
    const name = event ? event.filter: undefined;

    filter.rowsPerPage = 5;
    filter.skip = 0;
    filter.state = State.ACTIVE;

    if(name){
      filter.name = name;
      filter.skip = 0;
      filter.rowsPerPage = 0;
    }
    this.departmentApiService.getPaginatedDepartments$(filter).subscribe(response =>{
      this.departments = response.data;
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  private saveNewMunicipality(){
    const municipality = this.formSaveMunicipality.value as MunicipalityDTO;
    this.municipalityApiService.saveMunicipality$(municipality).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: MunicipalityMessagesConstants.MUNICIPALITY_CREATED_SUCCESS_MESSAGE});
      this.showModalNew = false;
      this.clear();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    });
  }

  public onInputChange(){
    this.formSaveMunicipality.get('name')?.valueChanges.subscribe((value) =>{
      if(value && value != null && value!=""){
        this.formSaveMunicipality.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }


  public openConfirmSave() {
    const message = GeneralMessagesConstants.GENERAL_CREATE_MESSAGE + ' municipality to this department?';
    const header = GeneralMessagesConstants.NEW_HEADER_MESSAGE + ' Municipality';
    
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
            this.saveNewMunicipality();
        },
    });
  }
}
