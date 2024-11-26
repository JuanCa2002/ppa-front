import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AirplaneApiService } from '../../services/airplane-api.service';
import { AirplaneDTO } from '../../../../../dtos/air-infrastructure/airplanes-management/airplane-dto';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { AirplaneFilterDTO } from '../../../../../dtos/air-infrastructure/airplanes-management/airplane-filter-dto';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-dto';
import { AirlineApiService } from '../../../airlines-management/services/airline-api.service';
import { AirlineFilterDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto';
import { State } from '../../../../../enums/ppa-adm/state';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-case.pipe';
import { AirplaneMessagesConstants } from '../../../../../constants/messages/air-infrastructure/airplane-messages.constant';

@Component({
  selector: 'app-airplanes-managament-table-show',
  templateUrl: './airplanes-managament-table-show.component.html',
  styleUrl: './airplanes-managament-table-show.component.css',
  providers: [CapitalizePipe]
})
export class AirplanesManagamentTableShowComponent implements OnInit, AfterViewInit{

  public rows: number = 10;
  public totalRecords: number = 0;
  public formSaveAirplane!: FormGroup;
  public showTable: boolean = false;
  public airplanes: AirplaneDTO[] = [];
  public messages: Message[] = [];
  public showModalNew: boolean = false;
  public isUpdate: boolean = false;
  public airlines: AirlineDTO[] = [];
  public selectedId: number = 0;
  public cache: AirplaneFilterDTO = new AirplaneFilterDTO;

  constructor(private airplaneApiService: AirplaneApiService, private messageService: MessageService,
    private fb: FormBuilder, private airlineApiService: AirlineApiService, private capitalizeService: CapitalizePipe,
    private confirmationService: ConfirmationService
  ){}

  ngAfterViewInit(): void {
    this.getArlines();
  }


  ngOnInit(): void {
    this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_FILTER_MESSAGE }];
    this.initializeForm();
    this.onInputChange();
  }

  private onInputChange(){
    this.formSaveAirplane.get('branch')?.valueChanges.subscribe((value) =>{
      if(value && value != null && value!=""){
        this.formSaveAirplane.get('branch')?.setValue(this.capitalizeService.transform(value), { emitEvent: false });
      }
    });
  }


  private initializeForm(){
    this.formSaveAirplane = this.fb.group({
      branch: [null, Validators.required],
      model: [null, Validators.required],
      airlineId: [null, Validators.required],
      state: [true, Validators.required]
    });
  }

  public showNew(){
    this.showModalNew = true;
  }

  public filterAirplanes(event?: any, filter?: any){
    const filterComplete = filter ? filter : this.cache;
      if (event) {
        filterComplete.skip = event.first;
        filterComplete.rowsPerPage = event.rows;
      }
    this.airplaneApiService.getPaginatedAirplanes$(filterComplete).subscribe(response =>{
        if(response.data.length > 0){
          this.airplanes = response.data;
          this.totalRecords = response.total;
          this.showTable = true;
          this.cache = filterComplete;
          return;
        }
        this.showTable = false;
        this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}];
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

  public editAirplane(airplane: AirplaneDTO){
    const date = new Date(airplane.model!, 0, 1);
    this.formSaveAirplane.get('branch')?.setValue(airplane.branch);
    this.formSaveAirplane.get('model')?.setValue(date);
    this.formSaveAirplane.get('airlineId')?.setValue(airplane.airline?.id);
    this.formSaveAirplane.get('state')?.setValue(airplane.state == State.ACTIVE ? true: false);
    this.selectedId = airplane.id!;
    this.isUpdate = true;
    this.showModalNew = true;
  }

  private createAirplane(){
    const date = new Date(this.formSaveAirplane.get('model')?.value);
    const airplane = this.formSaveAirplane.value as AirplaneDTO;
    airplane.model = date.getFullYear();
    this.airplaneApiService.postAirplane$(airplane).subscribe(() =>{
        this.showModalNew = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: AirplaneMessagesConstants.AIRPLANE_CREATED_SUCCESS_MESSAGE});
        this.formSaveAirplane.reset();
        this.filterAirplanes();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  private updateAirplane(){
    const date = new Date(this.formSaveAirplane.get('model')?.value);
    const airplane = this.formSaveAirplane.value as AirplaneDTO;
    airplane.model = date.getFullYear();
    airplane.state = airplane.state ? State.ACTIVE: State.INACTIVE;
    airplane.id = this.selectedId;
    this.airplaneApiService.putAirplane$(airplane).subscribe(() =>{
        this.showModalNew = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: AirplaneMessagesConstants.AIRPLANE_UPDATED_SUCCESS_MESSAGE});
        this.formSaveAirplane.reset();
        this.filterAirplanes();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  private changeStateAirplane(id: number){
    this.airplaneApiService.patchAirplane$(id).subscribe(() =>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: AirplaneMessagesConstants.AIRPLANE_STATE_UPDATED_SUCCESS_MESSAGE});
      this.filterAirplanes();
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

  public openConfirmSave() {
    const message = (this.isUpdate ? (GeneralMessagesConstants.GENERAL_UPDATE_MESSAGE + ' this '): 
                    (GeneralMessagesConstants.GENERAL_CREATE_MESSAGE) )+ ' airplane?';
    const header =  this.isUpdate ? GeneralMessagesConstants.UPDATE_HEADER_MESSAGE : GeneralMessagesConstants.NEW_HEADER_MESSAGE+ ' Airplane';
    
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
           !this.isUpdate ? this.createAirplane(): this.updateAirplane();
        },
    });
  }

  public openConfirmChangeState(id: number) {
    const message = GeneralMessagesConstants.GENERAL_CONFIRM_STATE_MESSAGE+ ' this airplane?';
    const header =  GeneralMessagesConstants.CHANGE_STATE_HEADER_MESSAGE+ ' Airplane';
    
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
           this.changeStateAirplane(id);
        },
    });
  }

  public onCancel(){
    this.showModalNew = false; 
    this.formSaveAirplane.reset(); 
    this.formSaveAirplane.get('state')?.setValue(true);
    this.isUpdate = false;
  }

}
