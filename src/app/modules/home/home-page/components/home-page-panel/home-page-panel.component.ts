import { Component, OnInit } from '@angular/core';
import { ItemDTO } from '../../../../../dtos/home/item-dto';
import { RouterConstants } from '../../../../../constants/routers/router-constants';
import { Router } from '@angular/router';
import { LocationsRouterConstants } from '../../../../../constants/routers/locations/locations-router-constants';
import { AirInfrastructureRouterConstants } from '../../../../../constants/routers/air-infrastructure/air-infrastructure-router-constants';
import { FlightsRouterConstants } from '../../../../../constants/routers/flights/flights-router-constants';

@Component({
  selector: 'app-home-page-panel',
  templateUrl: './home-page-panel.component.html',
  styleUrl: './home-page-panel.component.css'
})
export class HomePagePanelComponent implements OnInit{

  public items: ItemDTO[] = [];
  public isSubItems: boolean = false;
   
  constructor(private router: Router){}

  ngOnInit(): void {
    this.isSubItems = false;
    this.items = [
      {name: 'Locations', icon: 'pi pi-map-marker', subItems: [
        {name: 'Departments', icon: 'pi pi-sitemap', route: '/' + RouterConstants.LOCATIONS_ROUTER + '/' + LocationsRouterConstants.DEPARTMENT_ROUTER, isSubItem: true},
        {name: 'Municipalities', icon: 'pi pi-map', route: '/' + RouterConstants.LOCATIONS_ROUTER + '/' + LocationsRouterConstants.MUNICIPALITY_ROUTER, isSubItem: true}
      ]},
      {name: 'Air Infrastructure', icon: 'pi pi-share-alt', subItems: [
        {name: 'Airlines', icon: 'pi pi-flag', route: '/' + RouterConstants.AIR_INFRASTRUCTURE_ROUTER + '/' + AirInfrastructureRouterConstants.AIRLINE_ROUTER},
        {name: 'Airplanes', icon: 'pi pi-send', route: '/' + RouterConstants.AIR_INFRASTRUCTURE_ROUTER + '/' + AirInfrastructureRouterConstants.AIRPLANE_ROUTER},
        {name: 'Airports', icon: 'pi pi-arrows-alt', route: '/' + RouterConstants.AIR_INFRASTRUCTURE_ROUTER + '/' + AirInfrastructureRouterConstants.AIRPORT_ROUTER}
      ]},
      {name: 'Flights', icon: 'pi pi-cloud', route: '/' + RouterConstants.FLIGHTS_ROUTER + '/' + FlightsRouterConstants.FLIGHTS_ROUTER}
    ]
  }

  public onItemClick(item: ItemDTO): void {
    if(item.subItems && item.subItems?.length > 0){
      this.items = item.subItems;
      this.isSubItems = true;
      return;
    }
    this.router.navigate([item.route]);
  }

}
