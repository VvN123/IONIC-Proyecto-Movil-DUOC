import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaseDetallePage } from './clase-detalle.page';

describe('ClaseDetallePage', () => {
  let component: ClaseDetallePage;
  let fixture: ComponentFixture<ClaseDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClaseDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
