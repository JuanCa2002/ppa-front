import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoadingService } from './services/loading.service';
import { RouterConstants } from './constants/routers/router-constants';
import { LocationsRouterConstants } from './constants/routers/locations/locations-router-constants';
import { AirInfrastructureRouterConstants } from './constants/routers/air-infrastructure/air-infrastructure-router-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    items: MenuItem[] | undefined;
    isLoading = this.loadingService.loading$;

    constructor(private router: Router, private loadingService: LoadingService){}

    ngOnInit() {
        this.items = [
            {
                label: 'Locations',
                icon: 'pi pi-map-marker',
                items: [
                    {
                        label: 'Departments',
                        icon: 'pi pi-sitemap',
                        command:(click)=>{this.router.navigate(['/' + RouterConstants.LOCATIONS_ROUTER + '/' + LocationsRouterConstants.DEPARTMENT_ROUTER]);}
                    },
                    {
                        label: 'Municipalities',
                        icon: 'pi pi-map',
                        command:(click)=>{this.router.navigate(['/' + RouterConstants.LOCATIONS_ROUTER + '/' + LocationsRouterConstants.MUNICIPALITY_ROUTER]);}
                    }
                ]
            },
            {
                label: 'Air Infrastructure',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Airlines',
                        icon: 'pi pi-flag',
                        command:(click)=>{this.router.navigate(['/' + RouterConstants.AIR_INFRASTRUCTURE_ROUTER + '/' + AirInfrastructureRouterConstants.AIRLINE_ROUTER]);}
                    },
                    {
                        label: 'Airplanes',
                        icon: 'pi pi-send',
                        command:(click)=>{this.router.navigate(['/' + RouterConstants.AIR_INFRASTRUCTURE_ROUTER + '/' + AirInfrastructureRouterConstants.AIRPLANE_ROUTER]);}
                    },
                    {
                        label: 'Airports',
                        icon: 'pi pi-arrows-alt',
                        command: (click)=>{this.router.navigate(['/' + RouterConstants.AIR_INFRASTRUCTURE_ROUTER + '/' + AirInfrastructureRouterConstants.AIRPORT_ROUTER]);}
                    }
                ]
            },
            {
                label: 'Flights',
                icon: 'pi pi-cloud'
            }
        ];
    }
}
