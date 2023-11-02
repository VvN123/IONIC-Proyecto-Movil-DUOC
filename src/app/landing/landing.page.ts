import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}