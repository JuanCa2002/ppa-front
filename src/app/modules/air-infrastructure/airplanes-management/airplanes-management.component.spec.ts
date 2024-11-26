import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesManagementComponent } from './airplanes-management.component';

describe('AirplanesManagementComponent', () => {
  let component: AirplanesManagementComponent;
  let fixture: ComponentFixture<AirplanesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplanesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirplanesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
