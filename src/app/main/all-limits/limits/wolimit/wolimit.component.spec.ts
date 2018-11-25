import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WOLimitComponent } from './wolimit.component';

describe('WOLimitComponent', () => {
  let component: WOLimitComponent;
  let fixture: ComponentFixture<WOLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WOLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WOLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
