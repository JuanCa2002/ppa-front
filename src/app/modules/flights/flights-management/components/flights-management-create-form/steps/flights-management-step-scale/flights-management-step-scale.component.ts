import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentFilterDTO } from '../../../../../../../dtos/locations/department-management/department-filter.dto';
import { State } from '../../../../../../../enums/ppa-adm/state';
import { DepartmentApiService } from '../../../../../../locations/department-management/services/department-api.service';
import { MunicipalityApiService } from '../../../../../../locations/municipalities-management/services/municipality-api.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DepartmentDto } from '../../../../../../../dtos/locations/department-management/department.dto';
import { MunicipalityDTO } from '../../../../../../../dtos/locations/municipalities-management/municipality.dto';
import { UnitTime } from '../../../../../../../enums/ppa-adm/unit-time';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { ScaleMessagesConstants } from '../../../../../../../constants/messages/flights/scale-messages-constants';
import { DatePipe } from '@angular/common';
import { AirportFilterDTO } from '../../../../../../../dtos/air-infrastructure/airports-management/airport-filter-dto';
import { AirportDTO } from '../../../../../../../dtos/air-infrastructure/airports-management/airport-dto';
import { AirportApiService } from '../../../../../../air-infrastructure/airports-management/services/airport-api.service';
import { FlightDataService } from '../../../../services/flight-data.service';
import { ScaleDTO } from '../../../../../../../dtos/flights/flight-management/scale-dto';
import { FlightDTO } from '../../../../../../../dtos/flights/flight-management/flight-dto';

@Component({
  selector: 'app-flights-management-step-scale',
  templateUrl: './flights-management-step-scale.component.html',
  styleUrl: './flights-management-step-scale.component.css',
  providers: [DatePipe]
})
export class FlightsManagementStepScaleComponent implements OnInit{

  public formScales!: FormGroup;
  public formHasScales!: FormGroup;
  public unitsTime: any[] = [];
  public scaleForm!: FormGroup;
  public showModalNew: boolean = false;
  public departmentsScale: DepartmentDto[] = [];
  public places: MunicipalityDTO[] = [];
  public airports: AirportDTO[] = [];
  public isUpdate: boolean = false;
  public selectIndexRecord: number | null = null;
  public messages: Message[] = [];
  public cacheFlight: FlightDTO | null = null;
  @Output() onNextStep = new EventEmitter(); 
  @Output() onPreviousStep = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(private fb: FormBuilder, private departmentApiService: DepartmentApiService,
    private municipalityApiService: MunicipalityApiService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private datePipe: DatePipe, private airportApiService: AirportApiService,
    private flightDataService: FlightDataService
  ){}

  ngOnInit(): void {
    this.unitsTime = [
      { value: UnitTime.HOURS, label: 'Hours' },
      { value: UnitTime.MINUTES, label: 'Minutes' }
    ];
    this.initializeForm();
    this.getDepartments();
    this.validateFields();
    this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_EMPTY_SCALES}];
  }

  public initializeForm(){
    this.cacheFlight = this.flightDataService.getCacheFligth();
    this.formHasScales = this.fb.group({
      hasScales: [this.cacheFlight!= null && this.cacheFlight.scales!= null && this.cacheFlight.scales.length > 0 ? 'Yes': 'No', Validators.required]
    });
    this.formScales = this.fb.group({
      scales: this.fb.array([])
    });
    this.scaleForm = this.fb.group({
      id: [null],
      departmentScaleId: [null, Validators.required],
      departmentScaleName: [null],
      scaleMunicipalityId: [null, Validators.required],
      scaleMunicipalityName: [null],
      scalePlaceId: [null, Validators.required],
      scalePlaceName: [null],
      arrivalTimeScale: [null],
      arrivalTimeWF:  [null, Validators.required],
      estimatedTimeScale: [null, Validators.required],
      unitTime: [null, Validators.required]
    });
    this.populateFormArrayFromDto(this.cacheFlight!= null && this.cacheFlight.scales != null ? this.cacheFlight.scales: null);
  }

  public populateFormArrayFromDto(scales: ScaleDTO[] | null): void {
    if(scales!= null && scales.length > 0){
      const formArray = this.fb.array(
        scales.map(scale => this.fb.group({
          id: [scale.id],
          scalePlaceId: [scale.scalePlaceId],
          scalePlaceName: [scale.scalePlaceName],
          departmentScaleId: [scale.departmentScaleId],
          departmentScaleName: [scale.departmentScaleName],
          scaleMunicipalityId: [scale.scaleMunicipalityId],
          scaleMunicipalityName: [scale.scaleMunicipalityName],
          arrivalTimeScale: [scale.arrivalTimeScale],
          estimatedTimeScale: [scale.estimatedTimeScale],
          unitTime: [scale.unitTime],
          arrivalTimeWF: [scale.arrivalTimeWF],
          itineraryId: [scale.itineraryId]
        }))
      );
    
      this.formScales.setControl('scales', formArray);
    }
  }

  get scales(){
    return this.formScales.get('scales') as FormArray;
  }

  private validateScaleSameLocations(){
    return this.validateScaleSameAsDestiny() || this.validateScaleSameAsOrigin();
  }

  private validateScaleSameAsDestiny(){
    return (this.cacheFlight?.itinerary?.departmentDestinyId === this.scaleForm.get('departmentScaleId')?.value) &&
    (this.cacheFlight?.itinerary?.destinyPlaceId === this.scaleForm.get('scaleMunicipalityId')?.value) &&
    (this.cacheFlight?.itinerary?.destinyId === this.scaleForm.get('scalePlaceId')?.value); 
  }

  private validateScaleSameAsOrigin(){
    return (this.cacheFlight?.itinerary?.departmentOriginId === this.scaleForm.get('departmentScaleId')?.value) &&
    (this.cacheFlight?.itinerary?.originPlaceId === this.scaleForm.get('scaleMunicipalityId')?.value) &&
    (this.cacheFlight?.itinerary?.originId === this.scaleForm.get('scalePlaceId')?.value); 
  }

  public addScale(){
    if(this.validateScaleSameLocations()){
      this.messages = [{severity: 'error', summary: 'Error', detail: ScaleMessagesConstants.SCALE_SAME_AS_ORIGIN_OR_DESTINY_ERROR_MESSAGE}];
      return;
    }
    const message = GeneralMessagesConstants.ADD_NEW_SCALE_MESSAGE;
    const header =  GeneralMessagesConstants.ADD_SCALE_MESSAGE;
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          const department: DepartmentDto = {...this.departmentsScale.filter(d => d.id === this.scaleForm.get('departmentScaleId')?.value)[0]};
          const place: MunicipalityDTO = {...this.places.filter(p => p.id === this.scaleForm.get('scaleMunicipalityId')?.value)[0]};
          const airport: AirportDTO = {...this.airports.filter(p => p.id === this.scaleForm.get('scalePlaceId')?.value)[0]};
          this.scaleForm.get('departmentScaleName')?.setValue(department.name);
          this.scaleForm.get('scaleMunicipalityName')?.setValue(place.name);
          this.scaleForm.get('scalePlaceName')?.setValue(airport.name);
          this.scaleForm.get('id')?.setValue(this.scales.length);
          this.scaleForm.get('arrivalTimeScale')?.setValue(this.datePipe.transform(this.scaleForm.get('arrivalTimeWF')?.value, 'HH:mm') + ':00');
          this.scales.push(this.fb.group({...this.scaleForm.value}));
          this.scaleForm.reset();
          this.showModalNew = false;
          this.messageService.add({severity: 'success', summary: 'Success', detail: ScaleMessagesConstants.SUCCESS_ADDING_NEW_SCALE});
        },
      });
  }

  public editingScale(index: number){
    const scaleToUpdate = this.scales.controls.find(s => s.get('id')?.value === index);
    this.getLocations({value: scaleToUpdate?.get('departmentScaleId')?.value});
    this.getAirports({value: scaleToUpdate?.get('scaleMunicipalityId')?.value});
    this.scaleForm.patchValue(scaleToUpdate?.value);
    this.isUpdate = true;
    this.selectIndexRecord = index;
    this.showModalNew = true;
  }
  
  public updateScale(){
    const message = GeneralMessagesConstants.UPDATE_SCALE_MESSAGE;
    const header =  GeneralMessagesConstants.UPDATE_HEADER_MESSAGE + ' Scale';
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.editScale();
        }
      });
  }

  public removeScale(index: number){
    const message = GeneralMessagesConstants.REMOVE_SCALE_MESSAGE;
    const header =  GeneralMessagesConstants.REMOVE_SCALE_HEADER_MESSAGE;
    this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.scales.removeAt(index);
        }
    });
  }


  private editScale() {
    let scaleToUpdate = this.scales.controls.find(
      s => s.get('id')?.value === this.selectIndexRecord
    );
  
    if (scaleToUpdate) {
      scaleToUpdate.patchValue(this.scaleForm.value);
      const department: DepartmentDto = {...this.departmentsScale.filter(d => d.id === this.scaleForm.get('departmentScaleId')?.value)[0]};
      const place: MunicipalityDTO = {...this.places.filter(p => p.id === this.scaleForm.get('scaleMunicipalityId')?.value)[0]};
      const airport: AirportDTO = {...this.airports.filter(p => p.id === this.scaleForm.get('scalePlaceId')?.value)[0]};
      scaleToUpdate.get('departmentScaleName')?.setValue(department.name);
      scaleToUpdate.get('scaleMunicipalityName')?.setValue(place.name);
      scaleToUpdate.get('scalePlaceName')?.setValue(airport.name);
      scaleToUpdate.get('arrivalTimeScale')?.setValue(this.datePipe.transform(this.scaleForm.get('arrivalTimeWF')?.value, 'HH:mm') + ':00');
      this.showModalNew = false;
      this.messageService.add({severity: 'success', summary: 'Success', detail: ScaleMessagesConstants.SUCCESS_EDITING_SCALE});
    }
  }

  public getDepartments(event?: any){
      const filter = new DepartmentFilterDTO();
      filter.state = State.ACTIVE;
      filter.name = event ? event.filter : undefined;
      this.departmentApiService.getPaginatedDepartments$(filter).subscribe((response) =>{
        this.departmentsScale = response.data;
      }, error=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
  }
  
  public getLocations(event: any){
      const filter = new MunicipalityDTO();
      filter.departmentId = event.value;
      filter.state = State.ACTIVE;
      if(filter.departmentId && filter.departmentId!=null){
        this.municipalityApiService.getMunicipalities$(filter).subscribe((response) =>{
          this.places = response;
        }, error =>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
        })
      }
  }

  public getAirports(event: any){
      const filter = new AirportFilterDTO();
      filter.locationId = event.value;
      filter.state = State.ALLOWED;
      filter.rowsPerPage = 0;
      filter.skip = 0;
      if(filter.locationId && filter.locationId != null ){
        this.airportApiService.getPaginatedAirports$(filter).subscribe((response) =>{
          this.airports = response.data;
        }, error =>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
        })
      }
  }

  public cancelCreate(){
    const message = GeneralMessagesConstants.GENERAL_CANCEL_MESSAGE;
    const header =  GeneralMessagesConstants.CANCEL_HEADER_MESSAGE;
    this.confirmationService.confirm({
            message: message,
            header: header,
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
              this.flightDataService.removeData();
              this.onCancel.emit();
            }
          });
    }

    public cancelAddScale(){
      this.showModalNew = false; 
      this.scaleForm.reset(); 
      this.isUpdate = false; 
      this.selectIndexRecord = null;
      this.messages = [{ severity: 'info', detail: GeneralMessagesConstants.GENERAL_INFO_EMPTY_SCALES}];
    }

    public nextStep(){
      if(this.scales.length > 0 && this.formHasScales.get('hasScales')?.value === 'Yes'){
        const scalesArray: ScaleDTO[] = this.scales.controls.map(control => {
          return control.value as ScaleDTO;
        });
        this.cacheFlight!.scales = scalesArray;
      }else{
        this.cacheFlight!.scales = [];
      }
      this.flightDataService.addData(this.cacheFlight!);
      this.onNextStep.emit();
    }

    private validateFields(){
      this.scaleForm.get('estimatedTimeScale')?.valueChanges.subscribe((currentValue) => {
        if (currentValue > 100) {
          this.scaleForm.get('estimatedTimeScale')?.setValue(100);
        }
      });
    }




}
