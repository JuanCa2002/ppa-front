import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-flights-management-create-form',
  templateUrl: './flights-management-create-form.component.html',
  styleUrl: './flights-management-create-form.component.css'
})
export class FlightsManagementCreateFormComponent implements OnInit{

  public items: MenuItem[] | undefined;
  public activeIndex: number = 0;
  @Output() onCancel = new EventEmitter();

  ngOnInit(): void {
    this.items = [
      {
          label: 'Basic Information'
      },
      {
          label: 'Itinerary'
      },
      {
          label: 'Scales'
      },
      {
          label: 'Confirmation'
      }
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  nextStep(){
    this.activeIndex = this.activeIndex + 1;
  }

  previousStep(){
    this.activeIndex = this.activeIndex - 1;
  }

  cancelCreate(){
    this.onCancel.emit();
  }

}
