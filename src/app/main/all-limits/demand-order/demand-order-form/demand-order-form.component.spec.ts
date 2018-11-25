import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandOrderFormComponent } from './demand-order-form.component';

describe('DemandOrderFormComponent', () => {
  let component: DemandOrderFormComponent;
  let fixture: ComponentFixture<DemandOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
