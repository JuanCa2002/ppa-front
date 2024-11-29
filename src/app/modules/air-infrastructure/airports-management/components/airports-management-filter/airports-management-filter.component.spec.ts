import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsManagementFilterComponent } from './airports-management-filter.component';

describe('AirportsManagementFilterComponent', () => {
  let component: AirportsManagementFilterComponent;
  let fixture: ComponentFixture<AirportsManagementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsManagementFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirportsManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
