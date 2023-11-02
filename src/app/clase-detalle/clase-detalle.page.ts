import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.page.html',
  styleUrls: ['./clase-detalle.page.scss'],
})
export class ClaseDetallePage implements OnInit {
  clase: any;
  alumnosInscritos: any[] = [];
  asistenciasFiltradas: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['clase']) {
        this.clase = JSON.parse(params['clase']);
        this.loadAlumnosInscritos(this.clase.id); 
        this.loadAsistencias(this.clase.id);
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
}
