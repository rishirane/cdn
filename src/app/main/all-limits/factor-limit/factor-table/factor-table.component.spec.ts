import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorTableComponent } from './factor-table.component';

describe('FactorTableComponent', () => {
  let component: FactorTableComponent;
  let fixture: ComponentFixture<FactorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
