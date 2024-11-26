import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesManagamentTableShowComponent } from './airplanes-managament-table-show.component';

describe('AirplanesManagamentTableShowComponent', () => {
  let component: AirplanesManagamentTableShowComponent;
  let fixture: ComponentFixture<AirplanesManagamentTableShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplanesManagamentTableShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirplanesManagamentTableShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
