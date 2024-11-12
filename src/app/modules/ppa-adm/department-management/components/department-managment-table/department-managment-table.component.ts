import { Component, OnInit } from '@angular/core';
import { DepartmentDto } from '../../../../../dtos/ppa-adm/department-management/department.dto';
import { DepartmentApiService } from '../../services/department-api.service';
import { DepartmentFilterDTO } from '../../../../../dtos/ppa-adm/department-management/department-filter.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { MessageService } from 'primeng/api';

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

    constructor(private departmentApiService: DepartmentApiService,
      private messageService: MessageService,
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
    }

    private initializaForm(){
      this.formFilterDepartment = this.fb.group({
        name: [null],
        state: [null]
      });
      this.formCreateDepartment = this.fb.group({
        name: [null]
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

    public saveNewDepartment(){
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

    public updateState(id: number){
      this.showLoad = true;
      this.departmentApiService.patchStateDepartment$(id).subscribe(data =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department State updated Succesfully' });
        this.loadDepartments();
      }, error =>{
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
        this.showLoad = false;
      })
      
    }



}
