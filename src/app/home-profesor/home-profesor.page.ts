import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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



  constructor(private authService: AuthService, private utilsService: UtilsService,private navCtrl: NavController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarClases();
    this.cargarUsuarios();
    this.currentUser = this.authService.getCurrentUser();

  }

  verDetalleClase(clase: any) {
    this.router.navigate(['/clase-detalle'], {
      queryParams: {
        clase: JSON.stringify(clase)
      }
    });
  }
  cargarClases() {
    this.authService.getClases().subscribe(clases => {
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
    this.authService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  seleccionarClase(clase) {
    this.claseSeleccionada = clase;
  }

  accionBoton() {
    if (this.claseSeleccionada) {
      // Obtener el UUID y la fecha
      const { uuid, fecha } = this.utilsService.generateData();
      this.utilsService.setUUID(uuid);
  
      // Crear el objeto asistencia
      const nuevaAsistencia = {
        nombreClase: this.claseSeleccionada.nombre,
        idClase: this.claseSeleccionada.id,
        uuid: uuid,
        fecha: fecha,
        alumnos: []
      };
  
      // Usar AuthService para enviar la nueva asistencia al servidor
      this.authService.addAsistencia(nuevaAsistencia).subscribe(response => {
        console.log('Asistencia creada:', response);
        // this.navCtrl.navigateForward(`/claseQr/${nuevaAsistencia.uuid}`);
        // console.log(this.navCtrl.navigateForward(`/claseQr/${nuevaAsistencia.uuid}`));
        this.router.navigate(['/generatedqr']);
        console.log('navegado')

        // console.log(this.router.navigate(['/claseqr', nuevaAsistencia.uuid]));

        // Aquí puedes añadir lógica adicional, como mostrar una notificación de éxito
      }, error => {
        console.error('Error creando asistencia:', error);
        // Aquí puedes manejar el error, por ejemplo mostrando una alerta al usuario
      });
    } else {
      console.warn('No se ha seleccionado ninguna clase');
      // Puedes mostrar una alerta al usuario indicando que debe seleccionar una clase primero
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
    this.authService.getClaseById(id).subscribe(data => {
      console.log(`Nombre de la clase: ${data.nombre}`);
      console.log(`Código de la clase: ${data.codigo}`);
    }, error => {
      console.error('Hubo un error al obtener la clase:', error);
    });
  }
  cerrarSesion() {
    this.authService.logout(); // Cierra la sesión
    this.router.navigate(['/landing']); // Redirige al landing o ruta que desees
  }
}
