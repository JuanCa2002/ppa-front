import { Component, OnInit } from '@angular/core';
import { MunicipalityApiService } from '../../services/municipality-api.service';
import { MunicipalityDTO } from '../../../../../dtos/locations/municipalities-management/municipality.dto';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';

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
    this.messages = [{ severity: 'info', detail: 'Click filter to view information' }];
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
          this.messages = [{ severity: 'error', detail: 'No results were found with the filters entered'}]; 
    }, error => {
          this.messages = [{ severity: 'error', detail: 'No results were found with the filters entered'}];
          this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
          this.showTable = false;
    });
  }

  private updateStateMunicipality(id: number){
    this.municipalityApiService.updateStateMunicipality$(id).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Municipality State Updated Succesfully'});
      this.loadMunicipalities(this.cache);
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public confirmChangeStateMunicipality(id: number){
    const message = 'Are you sure you wanna update the state of this municipality?';
    const header = 'Update State Municipality';
    
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
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Municipality Updated Succesfully'});
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
    const message = 'Are you sure you wanna update this municipality?';
    const header = 'Update Municipality';
    
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
