import { Component, OnInit } from '@angular/core';
import { MunicipalityApiService } from '../../services/municipality-api.service';
import { MunicipalityDTO } from '../../../../../dtos/locations/municipalities-management/municipality.dto';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { MunicipalityMessagesConstants } from '../../../../../constants/messages/locations/municipality-messages-constants';

@Component({
  selector: 'app-municipalities-management-table',
  templateUrl: './municipalities-management-table.component.html',
  styleUrl: './municipalities-management-table.component.css'
})
export class MunicipalitiesManagementTableComponent implements OnInit{

  public municipalities: MunicipalityDTO[] = [];
  public messages: Message[] = [];
  public showTable: boolean = false;
  private cache: MunicipalityDTO = new MunicipalityDTO();
  public formUpdateMunicipality!: FormGroup;
  public showModalUpdate: boolean = false;
  public selectedId: number = 0;

  constructor(private municipalityApiService: MunicipalityApiService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder
  ){}


  ngOnInit(): void {
    this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_FILTER_MESSAGE }];
    this.initializeForm();
    this.onInputChange();
  }

  private initializeForm(){
    this.formUpdateMunicipality = this.fb.group({
      name: [null, Validators.required],
      state: [null, Validators.required]
    })
  }


  public loadMunicipalities(filter: MunicipalityDTO) {
    this.municipalityApiService.getMunicipalities$(filter).subscribe(response => {
          if(response.length > 0){
            this.municipalities = response;
            this.showTable = true;
            this.cache = filter;
            return;
          }
          this.showTable = false;
          this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}]; 
    }, error => {
          this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}];
          this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
          this.showTable = false;
    });
  }

  private updateStateMunicipality(id: number){
    this.municipalityApiService.updateStateMunicipality$(id).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: MunicipalityMessagesConstants.MUNICIPALITY_STATE_UPDATED_SUCCESS_MESSAGE});
      this.loadMunicipalities(this.cache);
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public confirmChangeStateMunicipality(id: number){
    const message = GeneralMessagesConstants.GENERAL_CONFIRM_STATE_MESSAGE + ' this municipality?';
    const header = GeneralMessagesConstants.UPDATE_STATE_HEADER_MESSAGE+' Municipality';
    
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
            this.updateStateMunicipality(id);
        },
    });
  }

  public editMunicipality(municipality: MunicipalityDTO){
    this.formUpdateMunicipality.get('name')?.setValue(municipality.name);
    this.formUpdateMunicipality.get('state')?.setValue(municipality.state === State.ACTIVE ? true: false);
    this.selectedId = municipality.id!;
    this.showModalUpdate = true;
  }

  private updateMunicipality(){
    const updatedMunicipality = this.formUpdateMunicipality.value as MunicipalityDTO;
    updatedMunicipality.id = this.selectedId;
    updatedMunicipality.state = this.formUpdateMunicipality.get('state')?.value === true ? State.ACTIVE : State.INACTIVE;
    this.municipalityApiService.updateMunicipality$(updatedMunicipality).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: MunicipalityMessagesConstants.MUNICIPALITY_UPDATED_SUCCESS_MESSAGE});
      this.showModalUpdate = false;
      this.loadMunicipalities(this.cache);
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  private onInputChange(){
    this.formUpdateMunicipality.get('name')?.valueChanges.subscribe((value) =>{
      if(value && value != null && value!=""){
        this.formUpdateMunicipality.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  public openConfirmUpdate(){
    const message = GeneralMessagesConstants.GENERAL_UPDATE_MESSAGE+' this municipality?';
    const header = GeneralMessagesConstants.UPDATE_HEADER_MESSAGE+' Municipality';
    
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
            this.updateMunicipality();
        },
    });
  }

}
