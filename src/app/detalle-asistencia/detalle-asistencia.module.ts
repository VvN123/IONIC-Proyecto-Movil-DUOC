import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';

import { DetalleAsistenciaPageRoutingModule } from './detalle-asistencia-routing.module';

import { DetalleAsistenciaPage } from './detalle-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAsistenciaPageRoutingModule,
    QRCodeModule
  ],
  declarations: [DetalleAsistenciaPage]
})
export class DetalleAsistenciaPageModule {}
