import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeniedPage } from './denied.page';

describe('DeniedPage', () => {
  let component: DeniedPage;
  let fixture: ComponentFixture<DeniedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeniedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
