import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentManagmentTableComponent } from './department-managment-table.component';

describe('DepartmentManagmentTableComponent', () => {
  let component: DepartmentManagmentTableComponent;
  let fixture: ComponentFixture<DepartmentManagmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentManagmentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentManagmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
