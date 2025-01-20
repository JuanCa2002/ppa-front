import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePanelComponent } from './home-page-panel.component';

describe('HomePagePanelComponent', () => {
  let component: HomePagePanelComponent;
  let fixture: ComponentFixture<HomePagePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePagePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
