import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementStepScaleComponent } from './flights-management-step-scale.component';

describe('FlightsManagementStepScaleComponent', () => {
  let component: FlightsManagementStepScaleComponent;
  let fixture: ComponentFixture<FlightsManagementStepScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementStepScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementStepScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
