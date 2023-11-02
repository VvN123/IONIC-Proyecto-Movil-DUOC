import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
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
      this.apiService.getAttendanceDataByUuid(uuid).subscribe(asistenciaData => {
        this.asistencia = asistenciaData;
        console.log("DATOS de Asistencia", asistenciaData);
  
        this.apiService.getUserAttendanceDataByUuid(uuid).subscribe(alumnos => {
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
      // Assuming you have a uuid property in your asistencia object
      this.apiService.cerrarAsistencia(this.asistencia.uuid).subscribe(
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
