import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UtilsService } from '../services/utils.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})

export class HomeProfesorPage implements OnInit {
  clases: any[] = [];
  claseSeleccionada: any;
  alumnos: any[] = [];
  usuarios: any[] = [];
  currentUser: any;
  showSelect = false;
  clasesDelProfesor: any[] = [];
  logedAsProfesor : boolean


  constructor(private apiService: ApiService, private utilsService: UtilsService,private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarClases();
    this.currentUser = this.apiService.getCurrentUser();
    console.log(this.currentUser)
  }

  verDetalleClase(clase: any) {
    this.router.navigate(['/clase-detalle'], {
      queryParams: {
        clase: JSON.stringify(clase)
      }
    });
  }

  cargarClases() {
    this.apiService.getSubjects().subscribe(clases => {
      this.clases = clases;
      this.filtrarClasesDelProfesor();
    });
  }

  filtrarClasesDelProfesor() {
    this.clasesDelProfesor = this.clases.filter(clase => 
      this.currentUser.clases.includes(clase.id)
    );
  }

  seleccionarClase(clase) {
    this.claseSeleccionada = clase;
  }

  obtenerNombreYCodigoDeClase(id: number) {
    this.apiService.getSubjectById(id).subscribe(data => {
      console.log(`Nombre de la clase: ${data.nombre}`);
      console.log(`Código de la clase: ${data.codigo}`);
    }, error => {
      console.error('Hubo un error al obtener la clase:', error);
    });
  }
  cerrarSesion() {
    this.apiService.logOut();
    this.router.navigate(['/landing']); 
  }

  // getAlumnoName(id: number): string {
  //   const alumno = this.usuarios.find(user => user.id === id && !user.isProfesor);
  //   return alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Desconocido';
  // }


 // cargarUsuarios() {
  //   this.apiService.getUsers().subscribe(usuarios => {
  //     this.usuarios = usuarios;
  //   });
  // }


}
