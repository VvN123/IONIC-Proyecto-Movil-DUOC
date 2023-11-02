import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-generatedqr',
  templateUrl: './generatedqr.page.html',
  styleUrls: ['./generatedqr.page.scss'],
})
export class GeneratedqrPage implements OnInit {
  uuid: string;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.uuid = this.utilsService.getUUID();
  }
}