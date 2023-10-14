import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrInfoPage } from './qr-info.page';

describe('QrInfoPage', () => {
  let component: QrInfoPage;
  let fixture: ComponentFixture<QrInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
