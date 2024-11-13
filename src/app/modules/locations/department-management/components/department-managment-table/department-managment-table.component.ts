import { Component, OnInit } from '@angular/core';
import { DepartmentDto } from '../../../../../dtos/ppa-adm/department-management/department.dto';
import { DepartmentApiService } from '../../services/department-api.service';
import { DepartmentFilterDTO } from '../../../../../dtos/ppa-adm/department-management/department-filter.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    public showLoad: boolean = false;
    public showModalNew: boolean = false;
    public isUpdate: boolean = false;
    public selectDepartmentId: number = 0;
    public rows: number = 10;

    constructor(private departmentApiService: DepartmentApiService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private fb: FormBuilder
    ){}

    
    ngOnInit(): void {
      this.showLoad = true;
      this.initializaForm();
      this.loadDepartments();
      this.states = [
        {value: State.ACTIVE, label: 'Active'},
        {value: State.INACTIVE, label: 'Inactive'},
      ]
      this.showLoad = false;
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
      this.showLoad = true;
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
            this.departments = response.data;
            this.totalRecords = response.total;
            this.showLoad = false;
      }, error => {
            this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
            this.showLoad = false;
      });
    }

    private saveNewDepartment(){
      this.showLoad = true;
      const department: DepartmentDto = new DepartmentDto();
      department.name = this.formCreateDepartment.get('name')?.value;
      this.departmentApiService.saveDepartment$(department).subscribe(data =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department Created Succesfully' });
        this.loadDepartments();
        this.formCreateDepartment.reset();
        this.showModalNew = false;
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
        this.showLoad = false;
      }) 
    }

    private updateState(id: number){
      this.showLoad = true;
      this.departmentApiService.patchStateDepartment$(id).subscribe(data =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department State Updated Succesfully' });
        this.loadDepartments();
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
        this.showLoad = false;
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
      this.showLoad = true;
      const updatedDepartment = this.formCreateDepartment.value as DepartmentDto;
      updatedDepartment.id = this.selectDepartmentId;
      updatedDepartment.state = this.formCreateDepartment.get('state')?.value ? State.ACTIVE: State.INACTIVE;
      this.departmentApiService.updateDepartment$(updatedDepartment).subscribe(() =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department Updated Succesfully' });
        this.loadDepartments();
        this.formCreateDepartment.reset();
        this.showModalNew = false;
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
        this.showLoad = false;
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
        message: 'Are you sure you wanna change the state of this department?',
        header: 'Change State',
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
