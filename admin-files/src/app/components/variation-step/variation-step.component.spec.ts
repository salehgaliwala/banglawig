import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationStepComponent } from './variation-step.component';

describe('VariationStepComponent', () => {
  let component: VariationStepComponent;
  let fixture: ComponentFixture<VariationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
