import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorLimitComponent } from './debtor-limit.component';

describe('DebtorLimitComponent', () => {
  let component: DebtorLimitComponent;
  let fixture: ComponentFixture<DebtorLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
