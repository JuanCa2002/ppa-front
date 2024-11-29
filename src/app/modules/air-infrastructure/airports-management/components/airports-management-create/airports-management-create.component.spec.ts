import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsManagementCreateComponent } from './airports-management-create.component';

describe('AirportsManagementCreateComponent', () => {
  let component: AirportsManagementCreateComponent;
  let fixture: ComponentFixture<AirportsManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsManagementCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirportsManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
