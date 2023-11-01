import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratedqrPage } from './generatedqr.page';

describe('GeneratedqrPage', () => {
  let component: GeneratedqrPage;
  let fixture: ComponentFixture<GeneratedqrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneratedqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
