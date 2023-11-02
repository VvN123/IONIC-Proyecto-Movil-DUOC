import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.page.html',
  styleUrls: ['./clase-detalle.page.scss'],
})
export class ClaseDetallePage implements OnInit {
  clase: any;
  alumnosInscritos: any[] = [];
  asistenciasFiltradas: any[] = [];
  currentUser: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private utilsService : UtilsService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['clase']) {
        this.clase = JSON.parse(params['clase']);
        this.loadAlumnosInscritos(this.clase.id); 
        this.loadAsistencias(this.clase.id);
        this.currentUser = this.apiService.getCurrentUser();
        console.log(this.currentUser)
      }
    });
  }



  loadAlumnosInscritos(claseId: number) {
    this.apiService.getUserDataFromSubject(claseId).subscribe(
      alumnos => {
        this.alumnosInscritos = alumnos;
      },
      error => {
        console.error("Error al cargar los alumnos inscritos:", error);
      }
    );
  }

  loadAsistencias(claseId: number) {
    this.apiService.getAttendanceUsersFromSubject(claseId).subscribe(
      asistencias => {
        this.asistenciasFiltradas = asistencias;
      },
      error => {
        console.error("Error al cargar las asistencias:", error);
      }
    );
  }

  verDetalleAsistencia(id: string) {
    this.router.navigate(['/detalle-asistencia', id]);
  }


  accionBoton() {
    if (this.clase) {
      const { uuid, fecha } = this.utilsService.generateData();
      this.utilsService.setUUID(uuid);
  
      const nuevaAsistencia = {
        nombreClase: this.clase.nombre,
        idClase: this.clase.id,
        uuid: uuid,
        fecha: fecha,
        alumnos: []
      };
  
      this.apiService.addAttendance(nuevaAsistencia).subscribe(response => {
        console.log('Asistencia creada:', response);
        this.verDetalleAsistencia(uuid)
      }, error => {
        console.error('Error creando asistencia:', error);
      });
    } else {
      console.warn('No se ha seleccionado ninguna clase');
    }
  }


}
