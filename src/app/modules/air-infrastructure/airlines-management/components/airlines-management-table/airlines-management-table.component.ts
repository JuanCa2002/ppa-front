import { Component, OnInit } from '@angular/core';
import { AirlineApiService } from '../../services/airline-api.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { AirlineDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-dto';
import { AirlineFilterDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';
import { AirlineMessagesConstants } from '../../../../../constants/messages/air-infrastructure/airline-messages-constants';

@Component({
  selector: 'app-airlines-management-table',
  templateUrl: './airlines-management-table.component.html',
  styleUrl: './airlines-management-table.component.css'
})
export class AirlinesManagementTableComponent implements OnInit{
    public rows: number = 10;
    public totalRecords: number = 0;
    public showTable: boolean = false;
    public airlines: AirlineDTO[] = [];
    public showModalNew: boolean = false;
    public formSaveAirline!: FormGroup;
    public messages: Message[] = [];

    constructor(private airlineApiService: AirlineApiService,
                private messageService: MessageService,
                private fb: FormBuilder,
                private confirmationService: ConfirmationService
    ){}

    ngOnInit(): void {
      this.initializeForm();
      this.loadAirlines();
    }


    private initializeForm(){
      this.formSaveAirline = this.fb.group({
        name: [null, Validators.required],
        state: [true, Validators.required]
      })
    }

    private createAirline(){
      const airline = this.formSaveAirline.value as AirlineDTO;
      this.airlineApiService.saveAirline$(airline).subscribe(() =>{
        this.showModalNew = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: AirlineMessagesConstants.AIRLINE_CREATED_SUCCESS_MESSAGE});
        this.loadAirlines();
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      })
    }

    public openSaveDialog(){
      this.showModalNew = true;
    }
    
    private updateStateAirline(id: number){
      this.airlineApiService.updateStateAirline$(id).subscribe(() =>{
        this.messageService.add({severity: 'success', summary: 'Success', detail: AirlineMessagesConstants.AIRLINE_STATE_UPDATED_SUCCESS_MESSAGE});
        this.loadAirlines();
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      })
    }

    public loadAirlines(event?: any, filter?: AirlineFilterDTO) {
      const filterComplete = filter ? filter : new AirlineFilterDTO;
      if (event) {
        filterComplete.skip = event.first;
        filterComplete.rowsPerPage = event.rows;
      }

      this.airlineApiService.getPaginatedAirlines$(filterComplete).subscribe(response => {
            if(response.data.length > 0){
              this.airlines = response.data;
              this.totalRecords = response.total;
              this.showTable = true;
              return;
            }
            this.showTable = false;
            this.messages = [{ severity: 'error', detail: GeneralMessagesConstants.NO_RESULT_FOUND_MESSAGE}];
      }, error => {
            this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      });
    }

    public openConfirmSave() {
      const message = GeneralMessagesConstants.GENERAL_CREATE_MESSAGE + ' airline?';
      const header =  GeneralMessagesConstants.NEW_HEADER_MESSAGE+ ' Airline';
      
      this.confirmationService.confirm({
          message: message,
          header: header,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
              this.createAirline();
          },
      });
    }

    public openConfirmChangeState(id: number) {
      const message = GeneralMessagesConstants.GENERAL_CONFIRM_STATE_MESSAGE + ' this airline?';
      const header =  GeneralMessagesConstants.UPDATE_STATE_HEADER_MESSAGE+ ' Airline';
      
      this.confirmationService.confirm({
          message: message,
          header: header,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
              this.updateStateAirline(id);
          },
      });
    }

}
