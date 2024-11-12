import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Departments',
                icon: 'pi pi-home',
                path: '/department-management'
            },
            {
                label: 'Features',
                icon: 'pi pi-star'
            },
            {
                label: 'Projects',
                icon: 'pi pi-search'
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                badge: '3'
            }
        ];
    }
}
