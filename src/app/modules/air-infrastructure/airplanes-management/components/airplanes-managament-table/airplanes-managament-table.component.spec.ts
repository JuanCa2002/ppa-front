import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesManagamentTableComponent } from './airplanes-managament-table.component';

describe('AirplanesManagamentTableComponent', () => {
  let component: AirplanesManagamentTableComponent;
  let fixture: ComponentFixture<AirplanesManagamentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplanesManagamentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirplanesManagamentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
