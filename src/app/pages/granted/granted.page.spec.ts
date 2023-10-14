import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrantedPage } from './granted.page';

describe('GrantedPage', () => {
  let component: GrantedPage;
  let fixture: ComponentFixture<GrantedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GrantedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
