import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityHeaderComponent } from './facility-header.component';

describe('FacilityHeaderComponent', () => {
  let component: FacilityHeaderComponent;
  let fixture: ComponentFixture<FacilityHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
