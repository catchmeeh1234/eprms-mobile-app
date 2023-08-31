import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseRequestInfoPage } from './purchase-request-info.page';

describe('PurchaseRequestInfoPage', () => {
  let component: PurchaseRequestInfoPage;
  let fixture: ComponentFixture<PurchaseRequestInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PurchaseRequestInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
