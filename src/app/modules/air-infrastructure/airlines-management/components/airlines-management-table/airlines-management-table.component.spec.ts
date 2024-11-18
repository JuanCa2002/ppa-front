import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesManagementTableComponent } from './airlines-management-table.component';

describe('AirlinesManagementTableComponent', () => {
  let component: AirlinesManagementTableComponent;
  let fixture: ComponentFixture<AirlinesManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlinesManagementTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirlinesManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
