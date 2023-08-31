import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrCreatedPerMonthComponent } from './pr-created-per-month.component';

describe('PrCreatedPerMonthComponent', () => {
  let component: PrCreatedPerMonthComponent;
  let fixture: ComponentFixture<PrCreatedPerMonthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrCreatedPerMonthComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrCreatedPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
