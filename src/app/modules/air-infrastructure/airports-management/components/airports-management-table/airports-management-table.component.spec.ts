import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsManagementTableComponent } from './airports-management-table.component';

describe('AirportsManagementTableComponent', () => {
  let component: AirportsManagementTableComponent;
  let fixture: ComponentFixture<AirportsManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsManagementTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirportsManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
