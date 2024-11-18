import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesManagementComponent } from './airlines-management.component';

describe('AirlinesManagementComponent', () => {
  let component: AirlinesManagementComponent;
  let fixture: ComponentFixture<AirlinesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlinesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirlinesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
