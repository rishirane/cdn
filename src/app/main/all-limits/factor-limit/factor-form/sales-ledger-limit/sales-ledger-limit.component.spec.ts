import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLedgerLimitComponent } from './sales-ledger-limit.component';

describe('SalesLedgerLimitComponent', () => {
  let component: SalesLedgerLimitComponent;
  let fixture: ComponentFixture<SalesLedgerLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLedgerLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLedgerLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
