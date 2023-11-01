import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta para importar AuthService
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  correo: string;
  contrasena: string;
  errorMessage: string;

  constructor(private authService: AuthService,  private navCtrl: NavController) { }

  login() {
    this.authService.authenticate(this.correo, this.contrasena).subscribe(response => {
      if (response.isAuthenticated) {
        if (response.isProfesor) {
          this.navCtrl.navigateForward('/home-profesor');
        } else {
          this.navCtrl.navigateForward('/home-alumno');
        }
      } else {
        this.errorMessage = "Correo o contraseña incorrectos";
      }
    });
  }
}