import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaDetallePage } from './detalle-asistencia.page';

describe('DetalleAsistenciaPage', () => {
  let component: AsistenciaDetallePage;
  let fixture: ComponentFixture<AsistenciaDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistenciaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
