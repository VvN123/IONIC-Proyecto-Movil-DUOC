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


  constructor(private apiService: ApiService, private utilsService: UtilsService,private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarClases();
    this.cargarUsuarios();
    this.currentUser = this.apiService.getCurrentUser();
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

  cargarUsuarios() {
    this.apiService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  seleccionarClase(clase) {
    this.claseSeleccionada = clase;
  }

  accionBoton() {
    if (this.claseSeleccionada) {
      const { uuid, fecha } = this.utilsService.generateData();
      this.utilsService.setUUID(uuid);
  
      const nuevaAsistencia = {
        nombreClase: this.claseSeleccionada.nombre,
        idClase: this.claseSeleccionada.id,
        uuid: uuid,
        fecha: fecha,
        alumnos: []
      };
  
      this.apiService.addAttendance(nuevaAsistencia).subscribe(response => {
        console.log('Asistencia creada:', response);
        this.router.navigate(['/generatedqr']);
      }, error => {
        console.error('Error creando asistencia:', error);
      });
    } else {
      console.warn('No se ha seleccionado ninguna clase');
    }
  }

  getAlumnoName(id: number): string {
    const alumno = this.usuarios.find(user => user.id === id && !user.isProfesor);
    return alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Desconocido';
  }

  async mostrarSeleccionClase() {
    const alert = await this.alertController.create({
      header: 'Selecciona una clase',
      inputs: this.clasesDelProfesor.map(clase => ({
        name: 'clase',
        type: 'radio',
        label: clase.nombre || clase.codigo,
        value: clase
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: (claseSeleccionada) => {
            this.claseSeleccionada = claseSeleccionada;
            this.accionBoton();
          }
        }
      ]
    });

    await alert.present();
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
}
