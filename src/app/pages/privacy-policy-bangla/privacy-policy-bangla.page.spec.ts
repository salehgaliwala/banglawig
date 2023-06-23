import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyPolicyBanglaPage } from './privacy-policy-bangla.page';

describe('PrivacyPolicyBanglaPage', () => {
  let component: PrivacyPolicyBanglaPage;
  let fixture: ComponentFixture<PrivacyPolicyBanglaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyBanglaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyBanglaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
