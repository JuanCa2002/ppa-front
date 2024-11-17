import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalitiesManagementFilterComponent } from './municipalities-management-filter.component';

describe('MunicipalitiesManagementFilterComponent', () => {
  let component: MunicipalitiesManagementFilterComponent;
  let fixture: ComponentFixture<MunicipalitiesManagementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipalitiesManagementFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalitiesManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
