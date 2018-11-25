import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderLimitComponent } from './work-order-limit.component';

describe('WorkOrderLimitComponent', () => {
  let component: WorkOrderLimitComponent;
  let fixture: ComponentFixture<WorkOrderLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
