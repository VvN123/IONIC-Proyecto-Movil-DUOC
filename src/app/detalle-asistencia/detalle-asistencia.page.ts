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
  
        // Asumiendo que existe un método para obtener los alumnos por UUID de asistencia
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
          // Manejar la respuesta aquí, por ejemplo, actualizar la UI para reflejar el cambio.
          this.asistencia.isCerrada = true;
          // Puedes mostrar un mensaje de éxito o hacer alguna otra acción aquí.
        },
        error => {
          // Manejar el error aquí.
          console.error('Error al cerrar la asistencia:', error);
        }
      );
    }
  }

}
