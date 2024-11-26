import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { AirlineFilterDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-case.pipe';

@Component({
  selector: 'app-airlines-management-filter',
  templateUrl: './airlines-management-filter.component.html',
  styleUrl: './airlines-management-filter.component.css',
  providers: [CapitalizePipe]
})
export class AirlinesManagementFilterComponent implements OnInit{

    public formFilterAirline!: FormGroup;
    public states: any = [];
    @Output() onFilter = new EventEmitter<AirlineFilterDTO>();
    @Output() onCreate = new EventEmitter();

    constructor(private fb: FormBuilder, private capitalizeService: CapitalizePipe){}

    ngOnInit(): void {
      this.initializeForm();
      this.onInputChange();
      this.states = [
        {value: State.ACTIVE, label: 'Active'},
        {value: State.INACTIVE, label: 'Inactive'},
      ]
    }

    public filterAirlines(){
      const filter = this.formFilterAirline.value as AirlineFilterDTO;
      filter.skip = 0;
      filter.rowsPerPage = 10;
      this.onFilter.emit(filter);
    }


    private initializeForm(){
      this.formFilterAirline = this.fb.group({
        name: [null],
        state: [null]
      })
    }

    private onInputChange(){
      this.formFilterAirline.get('name')?.valueChanges.subscribe((value) =>{
        if(value && value != null && value!=""){
          this.formFilterAirline.get('name')?.setValue(this.capitalizeService.transform(value), { emitEvent: false });
        }
      });
    }

    public createNewAirline(){
      this.onCreate.emit();
    }

    public clearFilters(){
      this.formFilterAirline.reset();
    }



}
