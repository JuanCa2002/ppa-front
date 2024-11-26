import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../../../enums/ppa-adm/state';
import { AirlineDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-dto';
import { AirlineFilterDTO } from '../../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto';
import { AirlineApiService } from '../../../airlines-management/services/airline-api.service';
import { MessageService } from 'primeng/api';
import { AirplaneFilterDTO } from '../../../../../dtos/air-infrastructure/airplanes-management/airplane-filter-dto';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-case.pipe';

@Component({
  selector: 'app-airplanes-managament-table',
  templateUrl: './airplanes-managament-table.component.html',
  styleUrl: './airplanes-managament-table.component.css',
  providers: [CapitalizePipe]
})
export class AirplanesManagamentTableComponent implements OnInit, AfterViewInit{

  public formFiltersAirplane!: FormGroup;
  public states: any = [];
  public airlines: AirlineDTO[] = [];
  @Output() onFilter = new EventEmitter<AirlineFilterDTO>();
  @Output() onSave = new EventEmitter();

  constructor(private fb: FormBuilder, private airlineService: AirlineApiService,
    private messageService: MessageService, private capitalizeService: CapitalizePipe
  ){}
  
  ngAfterViewInit(): void {
    this.getArlines();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.onInputChange();
    this.states = [
      {value: State.ACTIVE, label: 'Active'},
      {value: State.INACTIVE, label: 'Inactive'},
    ]
  }

  private onInputChange(){
    this.formFiltersAirplane.get('branch')?.valueChanges.subscribe((value) =>{
      if(value && value != null && value!=""){
        this.formFiltersAirplane.get('branch')?.setValue(this.capitalizeService.transform(value), { emitEvent: false });
      }
    });
  }

  public createNewRecord(){
    this.onSave.emit();
  }


  public initializeForm(){
    this.formFiltersAirplane = this.fb.group({
      branch: [null],
      model: [null],
      state: [null],
      airlineId: [null, Validators.required]
    })
  }

  public clearFilter(){
    this.formFiltersAirplane.reset();
  }

  public filter(){
    const valueModel = this.formFiltersAirplane.get('model')?.value;
    const date = new Date(this.formFiltersAirplane.get('model')?.value);
    const filter = this.formFiltersAirplane.value as AirplaneFilterDTO;
    filter.skip = 0;
    filter.rowsPerPage = 10;
    filter.airlineId = this.formFiltersAirplane.get('airlineId')?.value;
    filter.model =valueModel && valueModel!=null ? date.getFullYear(): undefined;
    this.onFilter.emit(filter);
  }

  public getArlines(event?:any){
    const filter: AirlineFilterDTO = new AirlineFilterDTO();
    filter.name = event ? this.capitalizeService.transform(event.filter) : undefined;
    filter.state = State.ACTIVE;
    filter.skip = 0;
    filter.rowsPerPage = 10;
    
    this.airlineService.getPaginatedAirlines$(filter).subscribe((response) =>{
      this.airlines = response.data;
    }, error =>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: error.error.message});
    })
  }

}
