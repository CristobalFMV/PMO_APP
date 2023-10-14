import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recovery2Page } from './recovery2.page';

describe('Recovery2Page', () => {
  let component: Recovery2Page;
  let fixture: ComponentFixture<Recovery2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Recovery2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
