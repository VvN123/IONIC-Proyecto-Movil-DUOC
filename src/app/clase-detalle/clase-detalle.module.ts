import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseDetallePageRoutingModule } from './clase-detalle-routing.module';

import { ClaseDetallePage } from './clase-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseDetallePageRoutingModule
  ],
  declarations: [ClaseDetallePage]
})
export class ClaseDetallePageModule {}
