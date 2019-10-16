import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationErrorComponent } from './visualization-error.component';

describe('VisualizationErrorComponent', () => {
  let component: VisualizationErrorComponent;
  let fixture: ComponentFixture<VisualizationErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
