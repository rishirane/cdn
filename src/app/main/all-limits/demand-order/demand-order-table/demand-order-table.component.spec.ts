import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandOrderTableComponent } from './demand-order-table.component';

describe('DemandOrderTableComponent', () => {
  let component: DemandOrderTableComponent;
  let fixture: ComponentFixture<DemandOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
