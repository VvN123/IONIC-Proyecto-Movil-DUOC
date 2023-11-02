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
    clearTimeout(this.timeout);
  
    this.router.navigate(['/login']);
  }
}
