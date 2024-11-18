import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesManagementFilterComponent } from './airlines-management-filter.component';

describe('AirlinesManagementFilterComponent', () => {
  let component: AirlinesManagementFilterComponent;
  let fixture: ComponentFixture<AirlinesManagementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlinesManagementFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirlinesManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
