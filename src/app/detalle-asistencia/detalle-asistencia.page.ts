import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }
  asistencia : any
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const asistenciaId = params.get('uuid');
      console.log(asistenciaId)
      this.getAssistanceDetails(asistenciaId);
    });
  }

  async getAssistanceDetails(uuid: string) {
    try {
      this.authService.getAsistenciaByUuid(uuid).subscribe(asistenciaData => {
        this.asistencia = asistenciaData;
        console.log("DATOS de Asistencia", asistenciaData);
  
        this.authService.getAlumnosByAsistenciaUuid(uuid).subscribe(alumnos => {
          this.asistencia.alumnos = alumnos;
          console.log("Alumnos de la Asistencia", alumnos);
        });
      });
    } catch (error) {
      console.error("Error obteniendo los detalles de asistencia:", error);
    }
  }

  cerrarAsistencia() {
    if (this.asistencia && !this.asistencia.isCerrada) {
      this.authService.cerrarAsistencia(this.asistencia.id).subscribe(
        response => {
          this.asistencia.isCerrada = true;
        },
        error => {
          console.error('Error al cerrar la asistencia:', error);
        }
      );
    }
  }
}
