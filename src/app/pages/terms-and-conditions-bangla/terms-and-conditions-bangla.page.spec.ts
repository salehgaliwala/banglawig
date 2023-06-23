import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsBanglaPage } from './terms-and-conditions-bangla.page';

describe('TermsAndConditionsPage', () => {
  let component: TermsAndConditionsBanglaPage;
  let fixture: ComponentFixture<TermsAndConditionsBanglaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsBanglaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsBanglaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
