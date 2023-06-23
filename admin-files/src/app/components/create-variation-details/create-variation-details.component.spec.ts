import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVariationDetailsComponent } from './create-variation-details.component';

describe('CreateVariationDetailsComponent', () => {
  let component: CreateVariationDetailsComponent;
  let fixture: ComponentFixture<CreateVariationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVariationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVariationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
