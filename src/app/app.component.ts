import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  items: MenuItem[] | undefined;

    constructor(private router: Router){}

    ngOnInit() {
        this.items = [
            {
                label: 'Locations',
                icon: 'pi pi-map-marker',
                items: [
                    {
                        label: 'Departments',
                        icon: 'pi pi-sitemap',
                        command:(click)=>{this.router.navigate(['/locations/department-management']);}
                    },
                    {
                        label: 'Municipalities',
                        icon: 'pi pi-map',
                        command:(click)=>{this.router.navigate(['/locations/municipalities-management']);}
                    }
                ]
            },
            {
                label: 'Airlines',
                icon: 'pi pi-flag'
            },
            {
                label: 'Flights',
                icon: 'pi pi-cloud'
            }
        ];
    }
}
