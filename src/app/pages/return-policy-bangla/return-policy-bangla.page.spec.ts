import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnPolicyBanglaPage } from './return-policy-bangla.page';

describe('PrivacyPolicyBanglaPage', () => {
  let component: ReturnPolicyBanglaPage;
  let fixture: ComponentFixture<ReturnPolicyBanglaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnPolicyBanglaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnPolicyBanglaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
