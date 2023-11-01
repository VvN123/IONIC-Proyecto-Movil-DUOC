import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratedqrPage } from './generatedqr.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratedqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratedqrPageRoutingModule {}
