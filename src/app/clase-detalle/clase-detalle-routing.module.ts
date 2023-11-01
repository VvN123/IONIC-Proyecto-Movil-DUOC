import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseDetallePage } from './clase-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseDetallePageRoutingModule {}
