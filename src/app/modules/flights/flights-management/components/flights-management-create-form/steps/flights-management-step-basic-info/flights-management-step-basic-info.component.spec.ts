import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementStepBasicInfoComponent } from './flights-management-step-basic-info.component';

describe('FlightsManagementStepBasicInfoComponent', () => {
  let component: FlightsManagementStepBasicInfoComponent;
  let fixture: ComponentFixture<FlightsManagementStepBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementStepBasicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementStepBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
