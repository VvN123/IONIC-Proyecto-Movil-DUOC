import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  correo: string;
  contrasena: string;
  errorMessage: string;

  constructor(private authService: AuthService, private navCtrl: NavController, private alertCtrl: AlertController) { }

  async login() {
    if (!this.correo && !this.contrasena) {
      this.showAlert('Debe ingresar datos solicitados');
    } else if (!this.correo) {
      this.showAlert('No ha ingresado el correo');
    } else if (!this.contrasena) {
      this.showAlert('No ha ingresado la contraseña');
    } else {
      const response = await this.authService.authenticate(this.correo, this.contrasena).toPromise();

      if (response.isAuthenticated) {
        if (response.isProfesor) {
          this.navCtrl.navigateForward('/home-profesor');
        } else {
          this.navCtrl.navigateForward('/home-alumno');
        }
      } else {
        this.showAlert('Correo o contraseña incorrectos');
      }
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
