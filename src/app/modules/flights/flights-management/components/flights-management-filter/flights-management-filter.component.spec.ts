import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementFilterComponent } from './flights-management-filter.component';

describe('FlightsManagementFilterComponent', () => {
  let component: FlightsManagementFilterComponent;
  let fixture: ComponentFixture<FlightsManagementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
