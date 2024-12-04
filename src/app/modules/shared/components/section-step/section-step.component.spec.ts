import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStepComponent } from './section-step.component';

describe('SectionStepComponent', () => {
  let component: SectionStepComponent;
  let fixture: ComponentFixture<SectionStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
