import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-flights-management-create-form',
  templateUrl: './flights-management-create-form.component.html',
  styleUrl: './flights-management-create-form.component.css'
})
export class FlightsManagementCreateFormComponent implements OnInit{

  public items: MenuItem[] | undefined;
  public activeIndex: number = 0;

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
      }
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

}
