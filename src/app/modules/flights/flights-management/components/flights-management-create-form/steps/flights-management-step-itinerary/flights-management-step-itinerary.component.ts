import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitTime } from '../../../../../../../enums/ppa-adm/unit-time';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { ConfirmationService } from 'primeng/api';
import { FlightDataService } from '../../../../services/flight-data.service';
import { ItineraryDTO } from '../../../../../../../dtos/flights/flight-management/itinerary-dto';
import { FlightDTO } from '../../../../../../../dtos/flights/flight-management/flight-dto';

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
    private flightDataService: FlightDataService
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
      exitTime: [this.itinerary != null ? this.itinerary.exitTime : null, Validators.required],
      exitDate: [this.itinerary != null ? this.itinerary.exitDate : null, Validators.required],
      arrivalTime: [{value: this.itinerary != null ? this.itinerary.arrivalTime : null, disabled: true}, Validators.required],
      arrivalDate: [this.itinerary != null ? this.itinerary.arrivalDate : null, Validators.required]
    });
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

  public nextStep(){
    const itinerary = this.formItineraryData.getRawValue() as ItineraryDTO;
    this.itinerary = {...this.itinerary, ...itinerary};
    this.cacheFlight!.itinerary = this.itinerary;
    this.flightDataService.addData(this.cacheFlight!);
    this.onNextStep.emit();
  }

}
