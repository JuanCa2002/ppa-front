import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent implements OnInit{

  @Input() public title: string = "";
  @Input() public items: MenuItem[] | undefined;
  public home: MenuItem | undefined;

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
}

}
