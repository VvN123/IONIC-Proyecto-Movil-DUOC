import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeAlumnoPageRoutingModule } from './home-alumno-routing.module';
import { HomeAlumnoPage } from './home-alumno.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAlumnoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeAlumnoPage]
})
export class HomeAlumnoPageModule {}
