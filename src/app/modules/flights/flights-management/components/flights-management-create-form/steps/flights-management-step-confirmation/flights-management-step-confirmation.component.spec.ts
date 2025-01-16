import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementStepConfirmationComponent } from './flights-management-step-confirmation.component';

describe('FlightsManagementStepConfirmationComponent', () => {
  let component: FlightsManagementStepConfirmationComponent;
  let fixture: ComponentFixture<FlightsManagementStepConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementStepConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementStepConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
