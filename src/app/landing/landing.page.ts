import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor( private router: Router) { }
  private timeout: any;
  ngOnInit() {
  }
  goToLogin() {
    // Cancela el setTimeout anterior para evitar redirecciones múltiples
    clearTimeout(this.timeout);
  
    // Navega al inicio de sesión
    this.router.navigate(['/login']);
  }
}
