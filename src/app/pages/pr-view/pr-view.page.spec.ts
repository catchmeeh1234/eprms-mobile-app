import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrViewPage } from './pr-view.page';

describe('PrViewPage', () => {
  let component: PrViewPage;
  let fixture: ComponentFixture<PrViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
