import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalitiesManagementTableComponent } from './municipalities-management-table.component';

describe('MunicipalitiesManagementTableComponent', () => {
  let component: MunicipalitiesManagementTableComponent;
  let fixture: ComponentFixture<MunicipalitiesManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipalitiesManagementTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalitiesManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
