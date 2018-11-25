import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSetUpComponent } from './program-set-up.component';

describe('ProgramSetUpComponent', () => {
  let component: ProgramSetUpComponent;
  let fixture: ComponentFixture<ProgramSetUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSetUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
