import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WolimittableComponent } from './wolimittable.component';

describe('WolimittableComponent', () => {
  let component: WolimittableComponent;
  let fixture: ComponentFixture<WolimittableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WolimittableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WolimittableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
