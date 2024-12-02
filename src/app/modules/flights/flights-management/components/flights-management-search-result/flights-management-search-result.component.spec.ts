import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsManagementSearchResultComponent } from './flights-management-search-result.component';

describe('FlightsManagementSearchResultComponent', () => {
  let component: FlightsManagementSearchResultComponent;
  let fixture: ComponentFixture<FlightsManagementSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsManagementSearchResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightsManagementSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
