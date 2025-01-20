import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitTime } from '../../../../../../../enums/ppa-adm/unit-time';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FlightDataService } from '../../../../services/flight-data.service';
import { ItineraryDTO } from '../../../../../../../dtos/flights/flight-management/itinerary-dto';
import { FlightDTO } from '../../../../../../../dtos/flights/flight-management/flight-dto';
import { ItineraryMessagesConstants } from '../../../../../../../constants/messages/flights/itinerary-messages-constants';

@Component({
  selector: 'app-flights-management-step-itinerary',
  templateUrl: './flights-management-step-itinerary.component.html',
  styleUrl: './flights-management-step-itinerary.component.css'
})
export class FlightsManagementStepItineraryComponent implements OnInit{

  public formItineraryData!: FormGroup;
  public unitsTime: any[] = [];
  public itinerary: ItineraryDTO | null = null;
  public cacheFlight: FlightDTO | null = null;
  public currentDate: Date = new Date();
  @Output() onNextStep = new EventEmitter();
  @Output() onPreviousStep = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private flightDataService: FlightDataService, private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.unitsTime = [
      { value: UnitTime.HOURS, label: 'Hours' },
      { value: UnitTime.MINUTES, label: 'Minutes' }
    ];
    this.initializeForm(); 
    this.validateFields(); 
  }

  public initializeForm(){
    this.cacheFlight = this.flightDataService.getCacheFligth();
    this.itinerary = this.cacheFlight != null ? this.cacheFlight.itinerary! : null;
    this.formItineraryData = this.fb.group({
      estimatedTime: [this.itinerary != null ? this.itinerary.estimatedTime : null, Validators.required],
      unitTime: [this.itinerary != null ? this.itinerary.unitTime : null, Validators.required],
      exitTime: [this.convertToDateIfNeeded(this.itinerary?.exitTime, 'time'), Validators.required],
      exitDate: [this.convertToDateIfNeeded(this.itinerary?.exitDate, 'date'), Validators.required],
      arrivalTime: [{value: this.convertToDateIfNeeded(this.itinerary!.arrivalTime, 'time'), disabled: true}, Validators.required],
      arrivalDate: [this.convertToDateIfNeeded(this.itinerary!.arrivalDate, 'date'), Validators.required]
    });
  }

  private convertToDateIfNeeded(value: any, type: 'date' | 'time'): Date | null {
    if (value instanceof Date) {
      return value;
    }
  
    if (typeof value === 'string') {
      if (type === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return new Date(value + 'T00:00:00');
      }
  
      if (type === 'time' && /^\d{2}:\d{2}:\d{2}$/.test(value)) {
        const [hours, minutes, seconds] = value.split(':').map(Number);
        const now = new Date();
        now.setHours(hours, minutes, seconds, 0);
        return now;
      }
    }
  
    return null;
  }

  private validateFields(){
    this.formItineraryData.get('estimatedTime')?.valueChanges.subscribe((currentValue) => {
      if (currentValue > 100) {
        this.formItineraryData.get('estimatedTime')?.setValue(100);
      }
    });
  }

  public setArrivalTime(){
    const exitTime = this.formItineraryData.get('exitTime')?.value;
    const addedTime = this.formItineraryData.get('estimatedTime')?.value; 
    const unitTime = this.formItineraryData.get('unitTime')?.value;
    if (exitTime && addedTime && unitTime) {
      const exitTimeCopy = new Date(exitTime.getTime());
      if(unitTime === UnitTime.MINUTES){
        exitTimeCopy.setMinutes(exitTimeCopy.getMinutes() + addedTime);
      }else{
        exitTimeCopy.setHours(exitTimeCopy.getHours() + addedTime);
      }
  
      const hours = exitTimeCopy.getHours().toString().padStart(2, '0');
      const minutes = exitTimeCopy.getMinutes().toString().padStart(2, '0');
      const arrivalTime =  new Date(exitTimeCopy.getTime());

      arrivalTime.setHours(Number(hours));
      arrivalTime.setMinutes(Number(minutes));
      
      this.formItineraryData.get('arrivalTime')?.setValue(arrivalTime);
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
  
    private validateExitDateAgainstArrivalDate(): boolean {
      const exitDate: Date = this.formItineraryData.get('exitDate')?.value;
      const arrivalDate: Date = this.formItineraryData.get('arrivalDate')?.value;
    
      if (!exitDate || !arrivalDate) {
        return false; 
      }
      return arrivalDate < exitDate;
    }

  public nextStep(){
    if(this.validateExitDateAgainstArrivalDate()){
      this.messageService.add({severity: 'error', summary: 'Error', detail: ItineraryMessagesConstants.ARRIVAL_DATE_BEFORE_EXIT_DATE_ERROR_MESSAGE});
      return;
    }
    const itinerary = this.formItineraryData.getRawValue() as ItineraryDTO;
    this.itinerary = {...this.itinerary, ...itinerary};
    this.cacheFlight!.itinerary = this.itinerary;
    this.flightDataService.addData(this.cacheFlight!);
    this.onNextStep.emit();
  }

}
