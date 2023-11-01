import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service'; // If you're still planning on using the utils service

@Component({
  selector: 'app-generatedqr',
  templateUrl: './generatedqr.page.html',
  styleUrls: ['./generatedqr.page.scss'],
})
export class GeneratedqrPage implements OnInit {
  uuid: string;

  constructor(private utilsService: UtilsService) { } // If you're using the utils service

  ngOnInit() {
    this.uuid = this.utilsService.getUUID();
    // Additional logic here
  }
}