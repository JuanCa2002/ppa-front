import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementCreateFormComponent } from './flights-management-create-form.component';

describe('FlightsManagementCreateFormComponent', () => {
  let component: FlightsManagementCreateFormComponent;
  let fixture: ComponentFixture<FlightsManagementCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
