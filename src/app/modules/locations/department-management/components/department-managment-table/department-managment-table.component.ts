import { Component, OnInit } from '@angular/core';
import { DepartmentApiService } from '../../services/department-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DepartmentDto } from '../../../../../dtos/locations/department-management/department.dto';
import { DepartmentFilterDTO } from '../../../../../dtos/locations/department-management/department-filter.dto';
import { DepartmentMessagesConstants } from '../../../../../constants/messages/locations/department-messages-constants';
import { GeneralMessagesConstants } from '../../../../../constants/messages/general-messages-constants';

@Component({
  selector: 'app-department-managment-table',
  templateUrl: './department-managment-table.component.html',
  styleUrl: './department-managment-table.component.css'
})
export class DepartmentManagmentTableComponent implements OnInit{

    public departments: DepartmentDto[] = [];
    public totalRecords: number = 0;
    public formFilterDepartment!: FormGroup;
    public formCreateDepartment!: FormGroup;
    public states: any[] = [];
    public showModalNew: boolean = false;
    public isUpdate: boolean = false;
    public selectDepartmentId: number = 0;
    public rows: number = 10;
    public showTable: boolean = false;
    public messages: Message[] = [];

    constructor(private departmentApiService: DepartmentApiService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private fb: FormBuilder,
    ){}

    
    ngOnInit(): void {
      this.initializaForm();
      this.loadDepartments();
      this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_FILTER_MESSAGE }];
      this.states = [
        {value: State.ACTIVE, label: 'Active'},
        {value: State.INACTIVE, label: 'Inactive'},
      ]
      this.onInputChange();
    }

    private initializaForm(){
      this.formFilterDepartment = this.fb.group({
        name: [null],
        state: [null]
      });
      this.formCreateDepartment = this.fb.group({
        name: [null, Validators.required],
        state: [null]
      })
    }

    public loadDepartments(event?: any) {
      const filter: DepartmentFilterDTO = new DepartmentFilterDTO();
      const name = this.formFilterDepartment.get('name')?.value;
      const state = this.formFilterDepartment.get('state')?.value;
        
      if (event) {
            filter.skip = event.first;
            filter.rowsPerPage = event.rows;
      }

      if(name){
        filter.name = name;
      }

      if(state){
        filter.state = state;
      }

      this.departmentApiService.getPaginatedDepartments$(filter).subscribe(response => {
            if(response.data.length > 0){
              this.departments = response.data;
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

    private saveNewDepartment(){
      const department: DepartmentDto = new DepartmentDto();
      department.name = this.formCreateDepartment.get('name')?.value;
      this.departmentApiService.saveDepartment$(department).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: DepartmentMessagesConstants.DEPARTMENT_CREATED_SUCCESS_MESSAGE });
        this.loadDepartments();
        this.formCreateDepartment.reset();
        this.showModalNew = false;
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      }) 
    }

    private updateState(id: number){
      this.departmentApiService.patchStateDepartment$(id).subscribe(data =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: DepartmentMessagesConstants.DEPARTMENT_STATE_UPDATED_SUCCESS_MESSAGE });
        this.loadDepartments();
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      }); 
    }

    public showModalUpdate(department: DepartmentDto){
      this.selectDepartmentId = department.id!;
      this.isUpdate = true; 
      this.showModalNew = true
      this.formCreateDepartment.get('name')?.setValue(department.name);
      this.formCreateDepartment.get('state')?.setValue(department.state == 'ACTIVE' ? true: false);
    }

    private update(){
      const updatedDepartment = this.formCreateDepartment.value as DepartmentDto;
      updatedDepartment.id = this.selectDepartmentId;
      updatedDepartment.state = this.formCreateDepartment.get('state')?.value ? State.ACTIVE: State.INACTIVE;
      this.departmentApiService.updateDepartment$(updatedDepartment).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: DepartmentMessagesConstants.DEPARTMENT_UPDATED_SUCCESS_MESSAGE });
        this.loadDepartments();
        this.formCreateDepartment.reset();
        this.showModalNew = false;
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
      })
    }

    public onInputChange(){
      this.formCreateDepartment.get('name')?.valueChanges.subscribe((value) =>{
        if(value && value != null && value!=""){
          this.formCreateDepartment.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
        }
      });
    }

    public clearFilters(){
      this.formFilterDepartment.reset();
    }

    public openConfirmChangeState(id: number){
      this.confirmationService.confirm({
        message: GeneralMessagesConstants.GENERAL_CONFIRM_STATE_MESSAGE + ' this department?',
        header: GeneralMessagesConstants.CHANGE_STATE_HEADER_MESSAGE,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
            this.updateState(id);
        },
    });
    }


    public openConfirmSave() {
      const message = 'Are you sure you wanna ' + (this.isUpdate ? 'update this' : 'create a new') + ' department?';
      const header = (this.isUpdate ? 'Update' : 'Create New') + ' Department';
      
      this.confirmationService.confirm({
          message: message,
          header: header,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
              this.isUpdate ? this.update() : this.saveNewDepartment();
          },
      });
  }



}
