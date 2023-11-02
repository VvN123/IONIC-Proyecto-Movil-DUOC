import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneratedqrPageRoutingModule } from './generatedqr-routing.module';
import { GeneratedqrPage } from './generatedqr.page';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratedqrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [GeneratedqrPage]
})
export class GeneratedqrPageModule {}
