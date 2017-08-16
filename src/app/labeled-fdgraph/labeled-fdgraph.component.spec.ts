import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledFDGraphComponent } from './labeled-fdgraph.component';

describe('LabeledFDGraphComponent', () => {
  let component: LabeledFDGraphComponent;
  let fixture: ComponentFixture<LabeledFDGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeledFDGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledFDGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
