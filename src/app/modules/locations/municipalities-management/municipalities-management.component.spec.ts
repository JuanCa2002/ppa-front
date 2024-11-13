import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalitiesManagementComponent } from './municipalities-management.component';

describe('MunicipalitiesManagementComponent', () => {
  let component: MunicipalitiesManagementComponent;
  let fixture: ComponentFixture<MunicipalitiesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipalitiesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
