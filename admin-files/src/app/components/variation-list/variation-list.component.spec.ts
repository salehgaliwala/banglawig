import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationListComponent } from './variation-list.component';

describe('VariationListComponent', () => {
  let component: VariationListComponent;
  let fixture: ComponentFixture<VariationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
