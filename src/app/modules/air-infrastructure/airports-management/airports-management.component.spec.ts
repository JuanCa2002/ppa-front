import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsManagementComponent } from './airports-management.component';

describe('AirportsManagementComponent', () => {
  let component: AirportsManagementComponent;
  let fixture: ComponentFixture<AirportsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirportsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
