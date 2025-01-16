import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementStepItineraryComponent } from './flights-management-step-itinerary.component';

describe('FlightsManagementStepItineraryComponent', () => {
  let component: FlightsManagementStepItineraryComponent;
  let fixture: ComponentFixture<FlightsManagementStepItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementStepItineraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementStepItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
